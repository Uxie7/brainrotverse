import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Check,
  Dices,
  Download,
  Layers,
  Move,
  RotateCcw,
  Sparkles,
  Star,
} from 'lucide-react';
import {
  CREATURE_BASES,
  CREATURE_ELEMENTS,
  getCreatureAnchors,
  PERSONALITIES,
} from '../data/brainrotData';
import { AnchorBox, ElementId, PageId, SavedCreature } from '../types';
import { composeCreatureImage, CreatureRender } from './CreatureRender';

interface CreatureLabPageProps {
  initialBaseId?: string;
  onSaveCreature: (creature: SavedCreature) => void;
  onNavigate: (page: PageId) => void;
}

const LAB_BG_COLORS = ['#fde68a', '#e9d5ff', '#fbcfe8', '#bfdbfe', '#bbf7d0'];

const NAME_PREFIXES = ['Tralalero', 'Bombardiro', 'Brr Brr', 'Cappuccina', 'Tung', 'Turbo', 'Sigma', 'Giga'];
const NAME_SUFFIXES = ['Crocodilo', 'Patapim', 'Sahur', 'Tralala', 'Bananini', 'Gato', 'Maximus', 'Goblin'];

export const CreatureLabPage: React.FC<CreatureLabPageProps> = ({
  initialBaseId,
  onSaveCreature,
  onNavigate,
}) => {
  const defaultBase =
    initialBaseId && CREATURE_BASES.some((b) => b.id === initialBaseId)
      ? initialBaseId
      : 'breadcat';

  const [selectedBaseId, setSelectedBaseId] = useState<string>(defaultBase);
  const [elements, setElements] = useState<ElementId[]>(['wings', 'crown', 'chain']);
  const [transforms, setTransforms] = useState<Record<ElementId, AnchorBox>>(() =>
    getCreatureAnchors(defaultBase)
  );
  const [selectedElement, setSelectedElement] = useState<ElementId | null>('crown');
  const [personality, setPersonality] = useState<string>('Chaotic');
  const [customName, setCustomName] = useState<string>('Panino Supreme');
  const [isComposing, setIsComposing] = useState(false);
  const [justSaved, setJustSaved] = useState(false);
  const [lastFusedUrl, setLastFusedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (initialBaseId && CREATURE_BASES.some((b) => b.id === initialBaseId)) {
      setSelectedBaseId(initialBaseId);
      setTransforms(getCreatureAnchors(initialBaseId));
      const found = CREATURE_BASES.find((b) => b.id === initialBaseId);
      if (found) setCustomName(`${found.name} Deluxe`);
      setLastFusedUrl(null);
      setJustSaved(false);
    }
  }, [initialBaseId]);

  const activeBase =
    CREATURE_BASES.find((b) => b.id === selectedBaseId) || CREATURE_BASES[0];

  const handleSelectBase = (baseId: string) => {
    setSelectedBaseId(baseId);
    setTransforms(getCreatureAnchors(baseId));
    setJustSaved(false);
    setLastFusedUrl(null);
  };

  const toggleElement = (elId: ElementId) => {
    setJustSaved(false);
    setLastFusedUrl(null);
    setElements((prev) => {
      const exists = prev.includes(elId);
      if (exists) {
        if (selectedElement === elId) setSelectedElement(null);
        return prev.filter((item) => item !== elId);
      } else {
        setSelectedElement(elId);
        return [...prev, elId];
      }
    });
  };

  const handleUpdateTransform = (id: ElementId, nextBox: AnchorBox) => {
    setJustSaved(false);
    setLastFusedUrl(null);
    setTransforms((prev) => ({ ...prev, [id]: nextBox }));
  };

  const handleResetSelected = () => {
    if (!selectedElement) return;
    const defaults = getCreatureAnchors(selectedBaseId);
    handleUpdateTransform(selectedElement, defaults[selectedElement]);
  };

  const handleRandomize = () => {
    setJustSaved(false);
    setLastFusedUrl(null);
    const randomBase =
      CREATURE_BASES[Math.floor(Math.random() * CREATURE_BASES.length)];
    const shuffled = [...CREATURE_ELEMENTS]
      .sort(() => 0.5 - Math.random())
      .slice(0, 2 + Math.floor(Math.random() * 2))
      .map((e) => e.id);
    const randPers =
      PERSONALITIES[Math.floor(Math.random() * PERSONALITIES.length)];
    const randName = `${NAME_PREFIXES[Math.floor(Math.random() * NAME_PREFIXES.length)]} ${
      NAME_SUFFIXES[Math.floor(Math.random() * NAME_SUFFIXES.length)]
    }`;
    setSelectedBaseId(randomBase.id);
    setTransforms(getCreatureAnchors(randomBase.id));
    setElements(shuffled);
    setSelectedElement(shuffled[0] ?? null);
    setPersonality(randPers);
    setCustomName(randName);
  };

  const handleCreate = async () => {
    if (isComposing) return;
    setIsComposing(true);
    try {
      const compositeImage = await composeCreatureImage(
        activeBase.image,
        activeBase.id,
        elements,
        transforms
      );

      const rarity: SavedCreature['rarity'] =
        elements.length >= 4
          ? 'MYTHIC'
          : elements.length >= 2
            ? 'EPIC'
            : elements.length === 1
              ? 'RARE'
              : 'COMMON';

      const newCreature: SavedCreature = {
        id: `creature-${Date.now()}`,
        name: customName.trim() || `${activeBase.name} #${Math.floor(Math.random() * 999)}`,
        baseId: activeBase.id,
        baseImage: activeBase.image,
        elements,
        personality,
        rarity,
        bgColor: LAB_BG_COLORS[Math.floor(Math.random() * LAB_BG_COLORS.length)],
        favorited: true,
        createdAt: Date.now(),
        compositeImage,
        customTransforms: transforms,
      };

      onSaveCreature(newCreature);
      setLastFusedUrl(compositeImage);
      setJustSaved(true);
    } finally {
      setIsComposing(false);
    }
  };

  const handleDownloadFused = async () => {
    const url =
      lastFusedUrl ||
      (await composeCreatureImage(
        activeBase.image,
        activeBase.id,
        elements,
        transforms
      ));
    const link = document.createElement('a');
    const safeName = (customName || activeBase.name)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-');
    link.download = `${safeName}.png`;
    link.href = url;
    link.click();
  };

  const selectedMeta = selectedElement
    ? CREATURE_ELEMENTS.find((e) => e.id === selectedElement)
    : null;
  const selectedBox = selectedElement ? transforms[selectedElement] : null;

  return (
    <div className="min-h-[calc(100vh-140px)] relative overflow-hidden bg-gradient-to-br from-[#ffe24a] via-[#f9a8d4] to-[#c084fc] py-6 sm:py-8 md:py-10">
      <div className="absolute inset-0 halftone-dots pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left: Title + Live Interactive Drag Stage + Sticker Adjust Bar */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start">
            <div className="w-full flex flex-wrap items-end justify-between gap-3">
              <div>
                <h1 className="font-graffiti text-5xl sm:text-6xl leading-[0.88] text-[#111111] -rotate-2">
                  CREATURE
                  <span className="block text-[#ff2e88] text-stroke-black">LAB</span>
                </h1>
                <p className="mt-2 font-marker text-base sm:text-lg md:text-xl text-[#111111] -rotate-1">
                  Mix. Match. Mutate.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomize}
                  className="brutal-btn min-h-[42px] bg-[#fff9ec] text-[#111111] px-4 py-2 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Dices className="w-4 h-4 text-[#9d4edd]" />
                  <span>RANDOMIZE</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadFused}
                  title="Download fused character as PNG"
                  className="brutal-btn min-h-[42px] bg-[#ffe24a] text-[#111111] px-3.5 py-2 rounded-full text-xs font-extrabold inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">PNG</span>
                </button>
              </div>
            </div>

            {/* Live Interactive Stage */}
            <div className="mt-5 sm:mt-6 w-full bg-[#fff9ec]/90 backdrop-blur-sm brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-7 flex flex-col items-center justify-center relative overflow-hidden">
              <div
                aria-hidden="true"
                className="absolute w-64 sm:w-80 h-64 sm:h-80 rounded-full bg-[#9d4edd]/20 blur-2xl pointer-events-none"
              />
              <Star className="absolute top-4 left-5 w-6 h-6 sm:w-7 sm:h-7 text-[#111111] fill-[#ffe24a] -rotate-12 pointer-events-none" />
              <Star className="absolute bottom-24 right-5 w-5 h-5 sm:w-6 sm:h-6 text-[#111111] fill-[#ff2e88] rotate-12 pointer-events-none" />

              <div className="py-5">
                <CreatureRender
                  baseId={activeBase.id}
                  baseImage={activeBase.image}
                  name={customName || activeBase.name}
                  elements={elements}
                  size="lg"
                  customTransforms={transforms}
                  interactive
                  selectedElement={selectedElement}
                  onSelectElement={setSelectedElement}
                  onChangeTransform={handleUpdateTransform}
                />
              </div>

              <div className="mt-2 flex flex-wrap items-center justify-center gap-2 z-10">
                <span className="px-3.5 py-1 rounded-full bg-[#111111] text-[#ffe24a] text-xs font-extrabold tracking-wide">
                  {customName || activeBase.name}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-[#ff2e88] text-white border-2 border-[#111111] text-xs font-extrabold">
                  {personality}
                </span>
              </div>

              {/* Interactive Sticker Adjust Toolbar */}
              <div className="mt-4 w-full bg-white border-2 border-[#111111] rounded-2xl p-3 z-20">
                {selectedElement && selectedMeta && selectedBox && elements.includes(selectedElement) ? (
                  <div className="space-y-2.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <img
                          src={selectedMeta.image}
                          alt={selectedMeta.label}
                          className="w-6 h-6 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-extrabold text-[#111111]">
                          Adjusting: {selectedMeta.label}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            handleUpdateTransform(selectedElement, {
                              ...selectedBox,
                              zLayer:
                                (selectedBox.zLayer ??
                                  (selectedElement === 'wings' ? 'back' : 'front')) === 'back'
                                  ? 'front'
                                  : 'back',
                            })
                          }
                          className="px-2.5 py-1 rounded-lg bg-[#e9d5ff] border-2 border-[#111111] text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Layers className="w-3 h-3" />
                          <span>
                            {(selectedBox.zLayer ??
                              (selectedElement === 'wings' ? 'back' : 'front')) === 'back'
                              ? 'Behind'
                              : 'Front'}
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleResetSelected}
                          title="Reset sticker position"
                          className="px-2.5 py-1 rounded-lg bg-neutral-100 border-2 border-[#111111] text-[11px] font-extrabold inline-flex items-center gap-1 cursor-pointer hover:bg-[#ffe24a]"
                        >
                          <RotateCcw className="w-3 h-3" />
                          <span>Reset</span>
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label className="flex items-center gap-2 text-[11px] font-extrabold text-neutral-700">
                        <span className="w-8 shrink-0">Size</span>
                        <input
                          type="range"
                          min={20}
                          max={155}
                          value={Math.round(selectedBox.widthPct)}
                          onChange={(e) =>
                            handleUpdateTransform(selectedElement, {
                              ...selectedBox,
                              widthPct: Number(e.target.value),
                            })
                          }
                          className="w-full accent-[#ff2e88] cursor-pointer"
                        />
                        <span className="w-9 text-right tabular-nums">
                          {Math.round(selectedBox.widthPct)}%
                        </span>
                      </label>

                      <label className="flex items-center gap-2 text-[11px] font-extrabold text-neutral-700">
                        <span className="w-8 shrink-0">Tilt</span>
                        <input
                          type="range"
                          min={-45}
                          max={45}
                          value={Math.round(selectedBox.rotateDeg ?? 0)}
                          onChange={(e) =>
                            handleUpdateTransform(selectedElement, {
                              ...selectedBox,
                              rotateDeg: Number(e.target.value),
                            })
                          }
                          className="w-full accent-[#9d4edd] cursor-pointer"
                        />
                        <span className="w-9 text-right tabular-nums">
                          {Math.round(selectedBox.rotateDeg ?? 0)}°
                        </span>
                      </label>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-neutral-600 flex items-center justify-center gap-1.5 text-center py-1">
                    <Move className="w-3.5 h-3.5 text-[#ff2e88] shrink-0" />
                    <span>
                      Drag any sticker directly on the creature to move it, or tap it to resize, tilt &amp; reorder layers.
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Controls Card */}
          <div className="lg:col-span-6 bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 md:p-7 space-y-5">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-xl sm:text-2xl text-[#111111]">
                Choose Your Elements:
              </h2>
              <span className="text-xs font-extrabold text-[#9d4edd]">
                {elements.length} equipped
              </span>
            </div>

            {/* Base Creature Picker */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2">
                Base Creature:
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-2.5">
                {CREATURE_BASES.map((base) => {
                  const active = selectedBaseId === base.id;
                  return (
                    <button
                      key={base.id}
                      type="button"
                      onClick={() => handleSelectBase(base.id)}
                      title={base.name}
                      className={`min-h-[68px] p-2 rounded-xl border-[2.5px] border-[#111111] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        active
                          ? 'bg-[#ffe24a] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                          : 'bg-white hover:bg-[#fff3b0]'
                      }`}
                    >
                      <img
                        src={base.image}
                        alt={base.name}
                        className="w-10 h-10 sm:w-11 sm:h-11 object-contain"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-extrabold text-[#111111] truncate w-full text-center">
                        {base.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Add Element 3D PNG Multi-Picker */}
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2">
                Add Element (tap to toggle, drag on preview):
              </p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {CREATURE_ELEMENTS.map((el) => {
                  const active = elements.includes(el.id);
                  return (
                    <button
                      key={el.id}
                      type="button"
                      onClick={() => toggleElement(el.id)}
                      className={`min-h-[66px] p-2 rounded-xl border-[2.5px] border-[#111111] flex flex-col items-center justify-center gap-1 cursor-pointer transition-all ${
                        active
                          ? 'bg-[#e9d5ff] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                          : 'bg-white hover:bg-neutral-100'
                      }`}
                    >
                      <img
                        src={el.image}
                        alt={el.label}
                        className="w-8 h-8 object-contain drop-shadow-[0_2px_3px_rgba(17,17,17,0.2)]"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[10px] font-extrabold text-[#111111] whitespace-nowrap">
                        {el.label.split(' ')[1] || el.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Name & Personality */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="creature-name"
                  className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Creature Name:
                </label>
                <input
                  id="creature-name"
                  type="text"
                  value={customName}
                  onChange={(e) => {
                    setCustomName(e.target.value);
                    setJustSaved(false);
                  }}
                  maxLength={28}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border-[2.5px] border-[#111111] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff2e88]"
                />
              </div>

              <div>
                <label
                  htmlFor="creature-personality"
                  className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1.5"
                >
                  Personality:
                </label>
                <select
                  id="creature-personality"
                  value={personality}
                  onChange={(e) => {
                    setPersonality(e.target.value);
                    setJustSaved(false);
                  }}
                  className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border-[2.5px] border-[#111111] text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#ff2e88] cursor-pointer"
                >
                  {PERSONALITIES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Create CTA */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                type="button"
                disabled={isComposing}
                onClick={handleCreate}
                className="w-full min-h-[48px] brutal-btn bg-[#ff2e88] text-white px-6 py-3.5 rounded-full font-extrabold text-sm sm:text-base tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {justSaved ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>SAVED TO COLLECTION!</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>{isComposing ? 'FUSING CREATURE...' : 'CREATE MY CREATURE'}</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </>
                )}
              </button>

              {justSaved && (
                <button
                  type="button"
                  onClick={() => onNavigate('profile')}
                  className="w-full sm:w-auto min-h-[48px] brutal-btn bg-[#ffe24a] text-[#111111] px-5 py-3.5 rounded-full font-extrabold text-sm whitespace-nowrap cursor-pointer"
                >
                  VIEW IN PROFILE →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
