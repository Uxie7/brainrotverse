import React, { useRef } from 'react';
import { getCreatureAnchors } from '../data/brainrotData';
import { AnchorBox, ElementId } from '../types';

interface CreatureRenderProps {
  baseId?: string;
  baseImage: string;
  name: string;
  elements: ElementId[];
  size?: 'sm' | 'md' | 'lg';
  customTransforms?: Partial<Record<ElementId, AnchorBox>>;
  interactive?: boolean;
  selectedElement?: ElementId | null;
  onSelectElement?: (id: ElementId | null) => void;
  onChangeTransform?: (id: ElementId, nextBox: AnchorBox) => void;
}

export const ACCESSORY_SRC: Record<ElementId, string> = {
  wings: '/assets/accessories/wings.png',
  crown: '/assets/accessories/crown.png',
  tophat: '/assets/accessories/tophat.png',
  shades: '/assets/accessories/shades.png',
  chain: '/assets/accessories/chain.png',
  sneakers: '/assets/accessories/sneakers.png',
};

const LAYER_ORDER: ElementId[] = [
  'wings',
  'sneakers',
  'chain',
  'shades',
  'crown',
  'tophat',
];

export const CreatureRender: React.FC<CreatureRenderProps> = ({
  baseId = 'breadcat',
  baseImage,
  name,
  elements,
  size = 'lg',
  customTransforms,
  interactive = false,
  selectedElement = null,
  onSelectElement,
  onChangeTransform,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef<{
    id: ElementId;
    startClientX: number;
    startClientY: number;
    startLeftPct: number;
    startTopPct: number;
    box: AnchorBox;
  } | null>(null);

  const defaultAnchors = getCreatureAnchors(baseId);
  const containerCls =
    size === 'sm'
      ? 'w-24 h-24'
      : size === 'md'
        ? 'w-36 h-36'
        : 'w-52 h-52 sm:w-64 sm:h-64 md:w-72 md:h-72';

  const getBox = (id: ElementId): AnchorBox => {
    const custom = customTransforms?.[id];
    if (custom) return custom;
    const def = defaultAnchors[id];
    if (id === 'tophat' && elements.includes('crown') && !customTransforms?.tophat) {
      return {
        ...def,
        topPct: def.topPct - 11,
        widthPct: def.widthPct * 0.88,
      };
    }
    return def;
  };

  const handlePointerDown = (
    e: React.PointerEvent<HTMLDivElement>,
    id: ElementId
  ) => {
    if (!interactive) return;
    e.stopPropagation();
    onSelectElement?.(id);

    const box = getBox(id);
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStateRef.current = {
      id,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startLeftPct: box.leftPct,
      startTopPct: box.topPct,
      box,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!interactive || !dragStateRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    if (!rect.width || !rect.height) return;

    const { id, startClientX, startClientY, startLeftPct, startTopPct, box } =
      dragStateRef.current;
    const dxPct = ((e.clientX - startClientX) / rect.width) * 100;
    const dyPct = ((e.clientY - startClientY) / rect.height) * 100;

    onChangeTransform?.(id, {
      ...box,
      leftPct: Math.round(Math.max(-25, Math.min(125, startLeftPct + dxPct)) * 10) / 10,
      topPct: Math.round(Math.max(-35, Math.min(115, startTopPct + dyPct)) * 10) / 10,
    });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragStateRef.current) {
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Ignore if capture was already released
      }
      dragStateRef.current = null;
    }
  };

  const activeOrdered = LAYER_ORDER.filter((id) => elements.includes(id));

  return (
    <div
      ref={containerRef}
      onClick={() => {
        if (interactive) onSelectElement?.(null);
      }}
      className={`relative flex items-center justify-center select-none ${containerCls}`}
    >
      {/* Main Base Mascot */}
      <img
        src={baseImage}
        alt={name}
        draggable={false}
        className="relative z-10 w-full h-full object-contain drop-shadow-[0_10px_14px_rgba(17,17,17,0.3)] pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Accessory Sticker Layers */}
      {activeOrdered.map((id, idx) => {
        const box = getBox(id);
        const isBack = (box.zLayer ?? (id === 'wings' ? 'back' : 'front')) === 'back';
        const isSelected = interactive && selectedElement === id;
        const zIndex = isBack ? 2 + idx : 20 + idx;

        return (
          <div
            key={id}
            onPointerDown={(e) => handlePointerDown(e, id)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onClick={(e) => {
              if (interactive) e.stopPropagation();
            }}
            style={{
              top: `${box.topPct}%`,
              left: `${box.leftPct}%`,
              width: `${box.widthPct}%`,
              zIndex: isSelected ? 40 : zIndex,
              transform: `translateX(-50%) rotate(${box.rotateDeg ?? 0}deg)`,
            }}
            className={`absolute max-w-none ${
              interactive
                ? 'pointer-events-auto touch-none cursor-grab active:cursor-grabbing'
                : 'pointer-events-none'
            } ${
              isSelected
                ? 'outline-2 outline-dashed outline-[#ff2e88] bg-[#ffe24a]/15 rounded-xl p-0.5'
                : interactive
                  ? 'hover:outline-2 hover:outline-dashed hover:outline-[#111111]/40 rounded-xl'
                  : ''
            }`}
          >
            <img
              src={ACCESSORY_SRC[id]}
              alt=""
              draggable={false}
              aria-hidden="true"
              className="w-full h-auto block drop-shadow-[0_5px_8px_rgba(17,17,17,0.32)] pointer-events-none"
              referrerPolicy="no-referrer"
            />
          </div>
        );
      })}
    </div>
  );
};

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Composites the base mascot PNG and selected 3D accessory PNGs (respecting
 * user-dragged positions, sizes, rotations, and back/front layer order) into a
 * crisp 640x640 transparent PNG data URL.
 */
export async function composeCreatureImage(
  baseImage: string,
  baseId: string,
  elements: ElementId[],
  customTransforms?: Partial<Record<ElementId, AnchorBox>>
): Promise<string> {
  const SIZE = 640;
  const STAGE = 420;
  const OFFSET = (SIZE - STAGE) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext('2d');
  if (!ctx) return baseImage;

  const anchors = getCreatureAnchors(baseId);
  const activeOrdered = LAYER_ORDER.filter((id) => elements.includes(id));

  const getBox = (id: ElementId): AnchorBox => {
    if (customTransforms?.[id]) return customTransforms[id]!;
    const def = anchors[id];
    if (id === 'tophat' && elements.includes('crown') && !customTransforms?.tophat) {
      return { ...def, topPct: def.topPct - 11, widthPct: def.widthPct * 0.88 };
    }
    return def;
  };

  const drawAnchored = async (src: string, box: AnchorBox) => {
    const img = await loadImage(src);
    const drawW = (box.widthPct / 100) * STAGE;
    const drawH = drawW * (img.height / img.width);
    const cx = OFFSET + (box.leftPct / 100) * STAGE;
    const topY = OFFSET + (box.topPct / 100) * STAGE;

    ctx.save();
    ctx.shadowColor = 'rgba(17, 17, 17, 0.32)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 6;
    ctx.translate(cx, topY + drawH / 2);
    ctx.rotate(((box.rotateDeg ?? 0) * Math.PI) / 180);
    ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH);
    ctx.restore();
  };

  try {
    // 1. Back-layer accessories
    for (const id of activeOrdered) {
      const box = getBox(id);
      const isBack = (box.zLayer ?? (id === 'wings' ? 'back' : 'front')) === 'back';
      if (isBack) await drawAnchored(ACCESSORY_SRC[id], box);
    }

    // 2. Base creature fitted inside STAGE square
    const baseImg = await loadImage(baseImage);
    const scale = Math.min(STAGE / baseImg.width, STAGE / baseImg.height);
    const bw = baseImg.width * scale;
    const bh = baseImg.height * scale;
    ctx.save();
    ctx.shadowColor = 'rgba(17, 17, 17, 0.3)';
    ctx.shadowBlur = 16;
    ctx.shadowOffsetY = 8;
    ctx.drawImage(baseImg, OFFSET + (STAGE - bw) / 2, OFFSET + (STAGE - bh) / 2, bw, bh);
    ctx.restore();

    // 3. Front-layer accessories
    for (const id of activeOrdered) {
      const box = getBox(id);
      const isBack = (box.zLayer ?? (id === 'wings' ? 'back' : 'front')) === 'back';
      if (!isBack) await drawAnchored(ACCESSORY_SRC[id], box);
    }

    return canvas.toDataURL('image/png');
  } catch {
    return baseImage;
  }
}
