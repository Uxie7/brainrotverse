import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Sparkles, Star } from 'lucide-react';
import { AURA_DIAGNOSES, AURA_QUESTIONS } from '../data/brainrotData';
import { AuraDiagnosis, PageId } from '../types';

interface AuraCheckPageProps {
  onCompleteAura: (diagnosis: AuraDiagnosis) => void;
  onNavigate: (page: PageId) => void;
}

export const AuraCheckPage: React.FC<AuraCheckPageProps> = ({
  onCompleteAura,
  onNavigate,
}) => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AuraDiagnosis | null>(null);

  const currentQ = AURA_QUESTIONS[step];
  const selectedOpt = answers[currentQ.id];
  const progressPct = ((step + 1) / AURA_QUESTIONS.length) * 100;

  const handleSelect = (optIndex: number) => {
    setAnswers((prev) => ({ ...prev, [currentQ.id]: optIndex }));
  };

  const handleNext = () => {
    if (selectedOpt === undefined) return;
    if (step < AURA_QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      const totalPoints = AURA_QUESTIONS.reduce((sum, q) => {
        const idx = answers[q.id] ?? 0;
        return sum + (q.options[idx]?.points ?? 20);
      }, 0);

      let chosen = AURA_DIAGNOSES[3];
      if (totalPoints >= 145) chosen = AURA_DIAGNOSES[0];
      else if (totalPoints >= 120) chosen = AURA_DIAGNOSES[1];
      else if (totalPoints >= 95) chosen = AURA_DIAGNOSES[2];

      setResult(chosen);
      onCompleteAura(chosen);
    }
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
    else onNavigate('home');
  };

  const handleRetake = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] relative overflow-hidden bg-gradient-to-br from-[#ffe24a] via-[#ffb3d1] to-[#ff2e88] py-6 sm:py-8 md:py-12">
      <div className="absolute inset-0 halftone-dots pointer-events-none" />
      <div
        aria-hidden="true"
        className="hidden md:block absolute top-0 right-0 w-36 h-36 checkerboard-sm opacity-70 border-b-[3px] border-l-[3px] border-[#111111] rotate-6 translate-x-6 -translate-y-4 pointer-events-none"
      />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {/* Progress Header */}
        <div className="flex items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6">
          <button
            type="button"
            onClick={handleBack}
            className="min-h-[40px] inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#fff9ec] border-2 border-[#111111] shadow-[2px_2px_0_#111111] font-extrabold text-xs cursor-pointer hover:bg-[#ffe24a] shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {!result && (
            <div className="flex-1 max-w-md flex items-center gap-2.5 sm:gap-3">
              <div className="flex-1 h-4 bg-white rounded-full border-[2.5px] border-[#111111] overflow-hidden shadow-[2px_2px_0_#111111]">
                <div
                  className="h-full bg-[#ff2e88] transition-all duration-300"
                  style={{ width: `${progressPct}%` }}
                />
              </div>
              <span className="font-display text-base sm:text-lg text-[#111111] tabular-nums whitespace-nowrap">
                {step + 1} / {AURA_QUESTIONS.length}
              </span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          {/* Left Title + Brain Mascot — Compact horizontal header on mobile, tall hero column on desktop */}
          <div className="lg:col-span-5 flex flex-row lg:flex-col items-center justify-between lg:items-start gap-4 text-left">
            <div>
              <h1 className="font-graffiti text-5xl sm:text-6xl lg:text-7xl leading-[0.88] text-[#111111] -rotate-2">
                AURA
                <span className="block text-[#ff2e88] text-stroke-black">CHECK</span>
              </h1>
              <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg font-extrabold text-[#111111]">
                Find out how cooked you really are.
              </p>
            </div>

            <div className="relative flex justify-center shrink-0 lg:w-full lg:mt-4">
              <Star className="hidden lg:block absolute top-2 left-8 w-7 h-7 text-[#111111] fill-[#ffe24a] -rotate-12" />
              <img
                src="/assets/mascots/brain_shades.png"
                alt="Cool brain wearing pixel sunglasses and sneakers"
                className="w-24 sm:w-32 lg:w-72 object-contain drop-shadow-[0_14px_16px_rgba(17,17,17,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Question Card or Diagnosis Card */}
          <div className="lg:col-span-7">
            {!result ? (
              <div className="bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 md:p-8">
                <h2 className="font-comic font-extrabold text-lg sm:text-xl md:text-2xl text-[#111111] leading-snug mb-5 sm:mb-6">
                  {currentQ.question}
                </h2>

                <div className="space-y-3">
                  {currentQ.options.map((opt, idx) => {
                    const isSelected = selectedOpt === idx;
                    return (
                      <button
                        key={opt.label}
                        type="button"
                        onClick={() => handleSelect(idx)}
                        className={`w-full min-h-[50px] text-left px-4 py-3.5 rounded-2xl border-[2.5px] border-[#111111] flex items-center gap-3.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#ffe24a] shadow-[3px_3px_0_#111111] -translate-y-0.5'
                            : 'bg-white hover:bg-[#fff3b0]'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full border-2 border-[#111111] flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-[#ff2e88]' : 'bg-white'
                          }`}
                        >
                          {isSelected && <span className="w-2 h-2 rounded-full bg-white" />}
                        </span>
                        <span className="font-bold text-sm md:text-base text-[#111111]">
                          {opt.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6 sm:mt-7 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="min-h-[44px] px-4 py-2 rounded-full border-2 border-[#111111] bg-white font-bold text-sm cursor-pointer hover:bg-neutral-100"
                  >
                    <ArrowLeft className="w-4 h-4 inline mr-1" />
                    Back
                  </button>

                  <button
                    type="button"
                    disabled={selectedOpt === undefined}
                    onClick={handleNext}
                    className={`brutal-btn min-h-[46px] px-6 sm:px-7 py-2.5 rounded-full font-extrabold text-sm md:text-base inline-flex items-center gap-2 ${
                      selectedOpt === undefined
                        ? 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                        : 'bg-[#ff2e88] text-white cursor-pointer'
                    }`}
                  >
                    <span>
                      {step === AURA_QUESTIONS.length - 1 ? 'REVEAL MY AURA' : 'Next'}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 md:p-8 space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-[#ffe24a] text-[11px] sm:text-xs font-extrabold tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    AURA DIAGNOSIS SAVED TO PROFILE
                  </span>
                  <span className="font-display text-2xl text-[#ff2e88] tabular-nums">
                    {result.cookedPercent}% COOKED
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 bg-white p-5 rounded-2xl border-[2.5px] border-[#111111]">
                  <img
                    src={result.mascot}
                    alt={result.title}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-contain shrink-0 drop-shadow-[0_6px_8px_rgba(17,17,17,0.25)]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-center sm:text-left">
                    <p className="text-xs font-extrabold uppercase tracking-wider text-[#9d4edd]">
                      Official Rank: {result.rank}
                    </p>
                    <h2 className="font-graffiti text-3xl md:text-4xl text-[#111111] leading-none mt-1">
                      {result.title}
                    </h2>
                    <p className="mt-2 text-sm font-semibold text-neutral-700 leading-relaxed">
                      {result.description}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="brutal-btn min-h-[46px] bg-white text-[#111111] px-5 py-2.5 rounded-full font-extrabold text-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>RETAKE QUIZ</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('profile')}
                    className="brutal-btn min-h-[46px] bg-[#ff2e88] text-white px-6 py-2.5 rounded-full font-extrabold text-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>VIEW IN PROFILE</span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
