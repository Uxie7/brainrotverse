import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Flame,
  RotateCcw,
  Timer,
  Trophy,
  Zap,
} from 'lucide-react';
import { CHALLENGE_QUESTIONS } from '../data/brainrotData';
import { PageId } from '../types';

interface ChallengePageProps {
  onFinishChallenge: (score: number) => void;
  onNavigate: (page: PageId) => void;
}

type Phase = 'intro' | 'playing' | 'summary';

export const ChallengePage: React.FC<ChallengePageProps> = ({
  onFinishChallenge,
  onNavigate,
}) => {
  const [phase, setPhase] = useState<Phase>('intro');
  const [qIndex, setQIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [score, setScore] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [streak, setStreak] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [timedOut, setTimedOut] = useState(false);

  const currentQ = CHALLENGE_QUESTIONS[qIndex];
  const isLocked = selectedOpt !== null || timedOut;

  useEffect(() => {
    if (phase !== 'playing' || isLocked) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setStreak(0);
      return;
    }
    const timer = window.setInterval(() => {
      setTimeLeft((t) => t - 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [phase, timeLeft, isLocked]);

  const startChallenge = () => {
    setPhase('playing');
    setQIndex(0);
    setTimeLeft(15);
    setScore(0);
    setCorrectCount(0);
    setStreak(0);
    setSelectedOpt(null);
    setTimedOut(false);
  };

  const handleChooseOption = (idx: number) => {
    if (isLocked) return;
    setSelectedOpt(idx);
    if (idx === currentQ.correctIndex) {
      const timeBonus = timeLeft * 5;
      const streakBonus = streak * 15;
      setScore((s) => s + 100 + timeBonus + streakBonus);
      setCorrectCount((c) => c + 1);
      setStreak((st) => st + 1);
    } else {
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (qIndex < CHALLENGE_QUESTIONS.length - 1) {
      setQIndex((i) => i + 1);
      setTimeLeft(15);
      setSelectedOpt(null);
      setTimedOut(false);
    } else {
      setPhase('summary');
      onFinishChallenge(score);
    }
  };

  return (
    <div className="min-h-[calc(100vh-140px)] relative overflow-hidden bg-gradient-to-br from-[#0e0f3d] via-[#15144a] to-[#5b21b6] text-white py-6 sm:py-8 md:py-12">
      <div className="absolute inset-0 halftone-dots-white opacity-20 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8">
        {phase === 'intro' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4 sm:space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ff2e88] border-2 border-[#111111] shadow-[3px_3px_0_#111111] text-xs font-extrabold tracking-wider">
                <Zap className="w-4 h-4 fill-[#ffe24a] text-[#ffe24a]" />
                <span>ARCADE TRIVIA MODE</span>
              </div>

              <h1 className="font-graffiti text-[clamp(3.25rem,12vw,4.75rem)] leading-[0.88] text-white text-stroke-black -rotate-1">
                BRAINROT
                <span className="block text-[#ffe24a]">CHALLENGE</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl font-bold text-indigo-100 max-w-md mx-auto lg:mx-0">
                10 questions. 15 seconds each. Are you ready?
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={startChallenge}
                  className="brutal-btn min-h-[50px] bg-[#ffe24a] text-[#111111] px-7 sm:px-8 py-3.5 sm:py-4 rounded-full font-extrabold text-base sm:text-lg tracking-wide inline-flex items-center gap-2.5 cursor-pointer"
                >
                  <span>START CHALLENGE</span>
                  <ArrowRight className="w-5 h-5 stroke-[3]" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 relative flex items-center justify-center py-4">
              {/* 15s Timer Badge */}
              <div className="absolute top-0 right-2 sm:right-12 z-20 rotate-6 bg-[#fff9ec] text-[#111111] w-20 h-20 sm:w-24 sm:h-24 rounded-full brutal-border brutal-shadow flex flex-col items-center justify-center">
                <Timer className="w-5 h-5 sm:w-6 sm:h-6 text-[#ff2e88]" />
                <span className="font-display text-xl sm:text-2xl leading-none mt-0.5">15s</span>
              </div>

              {/* LET'S GO Sticker */}
              <div className="absolute bottom-4 left-2 sm:left-12 z-20 -rotate-12 bg-[#ff2e88] text-white px-3.5 sm:px-4 py-1.5 sm:py-2 brutal-border brutal-shadow">
                <span className="font-graffiti text-xl sm:text-2xl tracking-wide">LET&apos;S GO!</span>
              </div>

              <img
                src="/assets/mascots/duck_chain.png"
                alt="Cool duck mascot with sunglasses and gold chain"
                className="relative z-10 w-48 sm:w-64 md:w-80 object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        )}

        {phase === 'playing' && (
          <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6">
            {/* Arcade HUD */}
            <div className="bg-[#1e1b69] brutal-border brutal-shadow rounded-2xl px-4 sm:px-5 py-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 tabular-nums">
                <span className="font-display text-lg sm:text-xl text-[#ffe24a]">
                  Q {qIndex + 1} / {CHALLENGE_QUESTIONS.length}
                </span>
                <span className="px-3 py-1 rounded-full bg-[#111111] text-white text-xs font-extrabold">
                  SCORE: {score}
                </span>
                {streak > 1 && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ff2e88] text-white text-xs font-extrabold">
                    <Flame className="w-3.5 h-3.5 fill-[#ffe24a]" />
                    {streak}x
                  </span>
                )}
              </div>

              {/* Live 15s Countdown Pill */}
              <div
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-full border-2 border-[#111111] font-display text-lg sm:text-xl tabular-nums ${
                  timeLeft <= 5
                    ? 'bg-[#ff2e88] text-white animate-pulse'
                    : 'bg-[#ffe24a] text-[#111111]'
                }`}
              >
                <Timer className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{timeLeft}s</span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-[#fff9ec] text-[#111111] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 md:p-8">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-5 sm:mb-6">
                <img
                  src={currentQ.mascot}
                  alt="Question mascot"
                  className="w-20 h-20 sm:w-24 sm:h-24 object-contain shrink-0 bg-[#ffe24a] p-2 rounded-2xl border-2 border-[#111111]"
                  referrerPolicy="no-referrer"
                />
                <h2 className="font-comic font-extrabold text-lg sm:text-xl md:text-2xl leading-snug text-center sm:text-left">
                  {currentQ.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                {currentQ.options.map((opt, idx) => {
                  const isCorrect = idx === currentQ.correctIndex;
                  const isPicked = selectedOpt === idx;

                  let btnStyle = 'bg-white hover:bg-[#ffe24a]';
                  if (isLocked) {
                    if (isCorrect) btnStyle = 'bg-[#4ade80] text-[#111111]';
                    else if (isPicked) btnStyle = 'bg-[#fb7185] text-white';
                    else btnStyle = 'bg-neutral-100 text-neutral-500';
                  }

                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isLocked}
                      onClick={() => handleChooseOption(idx)}
                      className={`min-h-[54px] p-3.5 sm:p-4 rounded-2xl border-[2.5px] border-[#111111] shadow-[3px_3px_0_#111111] text-left font-extrabold text-sm md:text-base flex items-center gap-2.5 transition-transform ${
                        !isLocked ? 'cursor-pointer hover:-translate-y-0.5' : 'cursor-default'
                      } ${btnStyle}`}
                    >
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#111111] text-white text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {isLocked && (
                <div className="mt-5 sm:mt-6 pt-4 border-t-2 border-neutral-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <p className="font-extrabold text-sm text-center sm:text-left">
                    {timedOut
                      ? `⏰ Time's up! Answer: ${currentQ.options[currentQ.correctIndex]}`
                      : selectedOpt === currentQ.correctIndex
                        ? '🔥 +100 Brainrot Points!'
                        : `💀 Cooked! Correct answer: ${currentQ.options[currentQ.correctIndex]}`}
                  </p>
                  <button
                    type="button"
                    onClick={handleNextQuestion}
                    className="brutal-btn min-h-[46px] bg-[#ff2e88] text-white px-6 py-2.5 rounded-full font-extrabold text-sm inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>
                      {qIndex === CHALLENGE_QUESTIONS.length - 1
                        ? 'SEE FINAL SCORE'
                        : 'NEXT QUESTION'}
                    </span>
                    <ArrowRight className="w-4 h-4 stroke-[3]" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {phase === 'summary' && (
          <div className="max-w-xl mx-auto bg-[#fff9ec] text-[#111111] brutal-border brutal-shadow-lg rounded-3xl p-6 sm:p-8 text-center space-y-5">
            <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ffe24a] brutal-border brutal-shadow mx-auto">
              <Trophy className="w-8 h-8 sm:w-10 sm:h-10 text-[#ff2e88]" />
            </div>

            <div>
              <p className="text-xs font-extrabold uppercase tracking-widest text-[#9d4edd]">
                SCORE SAVED TO YOUR PROFILE
              </p>
              <h2 className="font-graffiti text-4xl sm:text-5xl text-[#111111] mt-1">
                CHALLENGE COMPLETE!
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-4 bg-white p-4 rounded-2xl border-[2.5px] border-[#111111] tabular-nums">
              <div>
                <p className="text-xs font-extrabold text-neutral-500">FINAL SCORE</p>
                <p className="font-display text-3xl sm:text-4xl text-[#ff2e88]">{score}</p>
              </div>
              <div>
                <p className="text-xs font-extrabold text-neutral-500">ACCURACY</p>
                <p className="font-display text-3xl sm:text-4xl text-[#9d4edd]">
                  {correctCount}/{CHALLENGE_QUESTIONS.length}
                </p>
              </div>
            </div>

            <p className="font-bold text-sm text-neutral-700">
              {score >= 800
                ? '👑 Certified Brainrot Royalty! You actually know the lore inside out.'
                : score >= 450
                  ? '🔥 Solidly Cooked! Your For You Page is working overtime.'
                  : '🍞 Lightly Toasted! Spend 10 more minutes in The Feed and try again.'}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={startChallenge}
                className="brutal-btn min-h-[46px] bg-[#ffe24a] text-[#111111] px-6 py-3 rounded-full font-extrabold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
                <span>PLAY AGAIN</span>
              </button>
              <button
                type="button"
                onClick={() => onNavigate('profile')}
                className="brutal-btn min-h-[46px] bg-[#ff2e88] text-white px-6 py-3 rounded-full font-extrabold text-sm inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW PROFILE</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
