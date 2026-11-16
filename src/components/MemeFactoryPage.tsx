import React, { useEffect, useRef, useState } from 'react';
import { Check, Download, Star } from 'lucide-react';
import { MEME_BG_SWATCHES, MEME_TEMPLATES } from '../data/brainrotData';

interface MemeFactoryPageProps {
  onMemeExported: () => void;
}

export const MemeFactoryPage: React.FC<MemeFactoryPageProps> = ({
  onMemeExported,
}) => {
  const [selectedTemplateId, setSelectedTemplateId] = useState(MEME_TEMPLATES[0].id);
  const [topText, setTopText] = useState('TOO COOL');
  const [bottomText, setBottomText] = useState('FOR THIS WORLD');
  const [bgColor, setBgColor] = useState(MEME_BG_SWATCHES[0].hex);
  const [exportedFeedback, setExportedFeedback] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeTemplate =
    MEME_TEMPLATES.find((t) => t.id === selectedTemplateId) || MEME_TEMPLATES[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = 720;
    const H = 720;
    canvas.width = W;
    canvas.height = H;

    let cancelled = false;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = activeTemplate.image;

    const drawCanvas = (loadedImg: HTMLImageElement | null) => {
      if (cancelled) return;

      // 1. Background fill + comic burst rays
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, W, H);

      ctx.save();
      ctx.translate(W / 2, H / 2);
      const rays = 18;
      for (let i = 0; i < rays; i++) {
        ctx.rotate((Math.PI * 2) / rays);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(-42, -550);
        ctx.lineTo(42, -550);
        ctx.closePath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.14)';
        ctx.fill();
      }
      ctx.restore();

      // Halftone dots
      ctx.fillStyle = 'rgba(17, 17, 17, 0.08)';
      for (let y = 16; y < H; y += 22) {
        for (let x = 16; x < W; x += 22) {
          ctx.beginPath();
          ctx.arc(x, y, 2.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Mascot image centered
      if (loadedImg) {
        const maxW = W * 0.72;
        const maxH = H * 0.62;
        const ratio = Math.min(maxW / loadedImg.width, maxH / loadedImg.height);
        const drawW = loadedImg.width * ratio;
        const drawH = loadedImg.height * ratio;
        const dx = (W - drawW) / 2;
        const dy = (H - drawH) / 2 + 12;

        ctx.save();
        ctx.shadowColor = 'rgba(17, 17, 17, 0.45)';
        ctx.shadowBlur = 18;
        ctx.shadowOffsetY = 10;
        ctx.drawImage(loadedImg, dx, dy, drawW, drawH);
        ctx.restore();
      }

      // 3. Classic Meme Impact / Anton text with thick black outline
      const drawMemeLine = (raw: string, yPos: number) => {
        const text = raw.toUpperCase().trim();
        if (!text) return;

        ctx.save();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        let fontSize = 74;
        ctx.font = `900 ${fontSize}px Anton, Impact, sans-serif`;
        while (ctx.measureText(text).width > W - 70 && fontSize > 30) {
          fontSize -= 4;
          ctx.font = `900 ${fontSize}px Anton, Impact, sans-serif`;
        }

        ctx.lineJoin = 'round';
        ctx.lineWidth = 14;
        ctx.strokeStyle = '#111111';
        ctx.strokeText(text, W / 2, yPos);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(text, W / 2, yPos);
        ctx.restore();
      };

      drawMemeLine(topText, 78);
      drawMemeLine(bottomText, H - 72);

      // 4. Watermark corner tag
      ctx.save();
      ctx.font = '800 18px Fredoka, sans-serif';
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 4;
      ctx.textAlign = 'right';
      ctx.strokeText('BRAINROTVERSE™', W - 22, H - 18);
      ctx.fillText('BRAINROTVERSE™', W - 22, H - 18);
      ctx.restore();
    };

    img.onload = () => drawCanvas(img);
    img.onerror = () => drawCanvas(null);

    return () => {
      cancelled = true;
    };
  }, [activeTemplate, topText, bottomText, bgColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `brainrot-meme-${activeTemplate.id}.png`;
    link.href = dataUrl;
    link.click();

    onMemeExported();
    setExportedFeedback(true);
    setTimeout(() => setExportedFeedback(false), 2600);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] relative overflow-hidden bg-gradient-to-br from-[#ff8cc6] via-[#ffe24a] to-[#ffb3d1] py-6 sm:py-8 md:py-10">
      <div className="absolute inset-0 halftone-dots pointer-events-none" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 space-y-5 lg:space-y-0">
        {/* Mobile Title Header */}
        <div className="lg:hidden">
          <h1 className="font-graffiti text-5xl leading-[0.88] text-[#111111] -rotate-2">
            MEME <span className="text-[#ff2e88] text-stroke-black">FACTORY</span>
          </h1>
          <p className="mt-1.5 font-bold text-sm sm:text-base text-[#111111]">
            Turn ideas into legendary memes.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Live HTML5 Canvas Preview — Shown first on mobile so edits update visually above controls */}
          <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col md:flex-row items-center justify-center gap-5 relative">
            <div className="relative bg-white p-2.5 sm:p-3 rounded-3xl brutal-border brutal-shadow-lg sm:-rotate-1 max-w-[360px] sm:max-w-[430px] lg:max-w-[460px] w-full">
              <canvas
                ref={canvasRef}
                className="w-full h-auto rounded-2xl border-2 border-[#111111] block"
              />
            </div>

            <div className="hidden md:flex flex-col items-center gap-3 shrink-0">
              <div className="relative bg-[#fff9ec] px-4 py-2 brutal-border brutal-shadow rotate-6">
                <Star className="w-5 h-5 text-[#111111] fill-[#ffe24a] inline mr-1" />
                <span className="font-graffiti text-2xl text-[#111111]">MEME IT UP!</span>
              </div>
              <img
                src="/assets/mascots/doge_shades.png"
                alt="Doge wearing sunglasses"
                className="w-36 lg:w-44 object-contain drop-shadow-[0_12px_16px_rgba(17,17,17,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Controls Column */}
          <div className="order-2 lg:order-1 lg:col-span-5 space-y-5">
            <div className="hidden lg:block">
              <h1 className="font-graffiti text-6xl leading-[0.88] text-[#111111] -rotate-2">
                MEME
                <span className="block text-[#ff2e88] text-stroke-black">FACTORY</span>
              </h1>
              <p className="mt-2 font-bold text-lg text-[#111111]">
                Turn ideas into legendary memes.
              </p>
            </div>

            <div className="bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 md:p-6 space-y-4">
              {/* Template Picker */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2">
                  Choose Mascot Template:
                </p>
                <div className="grid grid-cols-4 gap-2">
                  {MEME_TEMPLATES.map((tpl) => {
                    const active = selectedTemplateId === tpl.id;
                    return (
                      <button
                        key={tpl.id}
                        type="button"
                        onClick={() => setSelectedTemplateId(tpl.id)}
                        title={tpl.name}
                        className={`min-h-[64px] p-1.5 rounded-xl border-2 border-[#111111] flex flex-col items-center justify-center gap-1 cursor-pointer transition-transform ${
                          active
                            ? 'bg-[#ffe24a] shadow-[2.5px_2.5px_0_#111111] -translate-y-0.5'
                            : 'bg-white hover:bg-[#fff3b0]'
                        }`}
                      >
                        <img
                          src={tpl.image}
                          alt={tpl.name}
                          className="w-9 h-9 sm:w-10 sm:h-10 object-contain"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[10px] font-extrabold truncate w-full text-center">
                          {tpl.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Top & Bottom Text Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
                <div>
                  <label
                    htmlFor="meme-top"
                    className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1"
                  >
                    Top Text
                  </label>
                  <input
                    id="meme-top"
                    type="text"
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    maxLength={32}
                    placeholder="TOO COOL"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border-[2.5px] border-[#111111] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2e88]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="meme-bottom"
                    className="block text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-1"
                  >
                    Bottom Text
                  </label>
                  <input
                    id="meme-bottom"
                    type="text"
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    maxLength={32}
                    placeholder="FOR THIS WORLD"
                    className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border-[2.5px] border-[#111111] font-bold text-sm focus:outline-none focus:ring-2 focus:ring-[#ff2e88]"
                  />
                </div>
              </div>

              {/* Background Color Swatches */}
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-neutral-600 mb-2">
                  Background Color:
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {MEME_BG_SWATCHES.map((swatch) => {
                    const active = bgColor === swatch.hex;
                    return (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setBgColor(swatch.hex)}
                        aria-label={swatch.label}
                        title={swatch.label}
                        className={`w-10 h-10 rounded-full border-[2.5px] border-[#111111] cursor-pointer transition-transform ${
                          active ? 'scale-110 ring-2 ring-[#111111] ring-offset-2' : 'hover:scale-105'
                        }`}
                        style={{ backgroundColor: swatch.hex }}
                      />
                    );
                  })}
                </div>
              </div>

              <button
                type="button"
                onClick={handleDownload}
                className="w-full min-h-[48px] brutal-btn bg-[#ff2e88] text-white px-6 py-3.5 rounded-full font-extrabold text-base tracking-wide inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                {exportedFeedback ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3]" />
                    <span>MEME DOWNLOADED!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Meme</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
