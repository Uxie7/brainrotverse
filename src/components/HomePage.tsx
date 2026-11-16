import React from 'react';
import { ArrowRight, Crown, Flame, Heart, Star, Zap } from 'lucide-react';
import { TRENDING_ITEMS } from '../data/brainrotData';
import { PageId } from '../types';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenLabWithBase: (baseId: string) => void;
}

const FEATURE_CARDS: {
  id: PageId;
  title: string;
  desc: string;
  cta: string;
  image: string;
  bg: string;
  tilt: string;
}[] = [
  {
    id: 'aura',
    title: 'AURA CHECK',
    desc: 'Find out how cooked you really are.',
    cta: 'TAKE THE TEST',
    image: '/assets/mascots/brain_shades.png',
    bg: 'bg-[#d8b4fe]',
    tilt: 'sm:-rotate-2 hover:rotate-0',
  },
  {
    id: 'lab',
    title: 'CREATURE LAB',
    desc: 'Mix. Match. Create your own brainrot!',
    cta: 'CREATE NOW',
    image: '/assets/mascots/fish_cat.png',
    bg: 'bg-[#e7f858]',
    tilt: 'sm:rotate-1 hover:rotate-0',
  },
  {
    id: 'meme',
    title: 'MEME FACTORY',
    desc: 'Turn ideas into legendary memes.',
    cta: 'MAKE A MEME',
    image: '/assets/mascots/duck_chain.png',
    bg: 'bg-[#fbcfe8]',
    tilt: 'sm:-rotate-2 hover:rotate-0',
  },
  {
    id: 'challenge',
    title: 'BRAINROT CHALLENGE',
    desc: 'Beat the absurd. Prove your sanity.',
    cta: 'PLAY NOW',
    image: '/assets/mascots/banana_cool.png',
    bg: 'bg-[#93c5fd]',
    tilt: 'sm:rotate-2 hover:rotate-0',
  },
  {
    id: 'feed',
    title: 'THE FEED',
    desc: 'Scroll. Like. Lose brain cells.',
    cta: 'EXPLORE',
    image: '/assets/mascots/bread_cat.png',
    bg: 'bg-[#fff9ec]',
    tilt: 'sm:-rotate-1 hover:rotate-0',
  },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenLabWithBase }) => {
  return (
    <div className="w-full overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative sunburst-yellow border-b-[3px] border-[#111111] overflow-hidden">
        {/* Halftone + Checkerboard Collage Accents */}
        <div className="absolute inset-0 halftone-dots pointer-events-none" />
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 right-0 w-36 h-44 checkerboard-md opacity-85 border-l-[3px] border-b-[3px] border-[#111111] rotate-6 translate-x-6 -translate-y-4 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden md:block absolute bottom-0 right-0 w-44 h-24 checkerboard-sm opacity-90 border-t-[3px] border-l-[3px] border-[#111111] -rotate-3 translate-x-6 translate-y-4 pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="hidden lg:block absolute top-16 left-1/3 w-72 h-72 rounded-full bg-[#ff2e88]/15 blur-2xl pointer-events-none"
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 pt-6 pb-8 sm:pt-10 sm:pb-12 lg:pt-12 lg:pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 lg:gap-4">
            {/* 1. Left Hero Mascots — First on small/medium screens & left column on desktop */}
            <div className="lg:col-span-4 relative flex items-end justify-center pt-9 sm:pt-10 lg:pt-8 min-h-[210px] sm:min-h-[270px] lg:min-h-[340px]">
              {/* NO THOUGHTS sticker */}
              <div className="absolute top-1 left-2 sm:left-12 lg:left-3 z-30 -rotate-12 bg-[#fff9ec] px-2.5 sm:px-3 py-1 sm:py-1.5 brutal-border brutal-shadow-sm">
                <span className="font-marker text-xs sm:text-sm md:text-base text-[#111111] tracking-wide">
                  NO THOUGHTS.
                </span>
              </div>
              <Star className="hidden sm:block absolute top-6 left-2/3 w-6 h-6 text-[#111111] fill-[#fff9ec] rotate-12 z-10" />

              <div className="relative inline-flex items-end justify-center">
                <img
                  src="/assets/mascots/shark_quartet.png"
                  alt="Tralalero Tralala Shark in blue sneakers"
                  className="relative z-10 w-44 sm:w-60 lg:w-80 object-contain drop-shadow-[0_14px_16px_rgba(17,17,17,0.28)] hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/mascots/cat_shades.png"
                  alt="Tabby cat in pixel shades"
                  className="relative z-20 -ml-6 sm:-ml-8 lg:-ml-10 mb-1 w-20 sm:w-28 lg:w-36 object-contain drop-shadow-[0_8px_10px_rgba(17,17,17,0.28)] rotate-3 shrink-0"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* 2. Center Typography & CTAs — Second on small/medium screens & center column on desktop */}
            <div className="lg:col-span-4 text-center z-20 flex flex-col items-center">
              <div className="relative inline-block mb-1">
                <Crown className="hidden sm:block absolute -top-6 -left-8 w-8 h-8 text-[#111111] fill-[#ffe24a] -rotate-12" />
                <Crown className="hidden sm:block absolute -top-5 -right-8 w-8 h-8 text-[#ff2e88] fill-[#ff2e88]/20 rotate-12" />
                <p className="font-display text-xl sm:text-3xl md:text-4xl text-[#111111] tracking-wide -rotate-2">
                  WELCOME TO THE
                </p>
              </div>

              <h1 className="font-graffiti text-[clamp(3.2rem,13vw,5.25rem)] leading-[0.88] text-[#ff2e88] text-stroke-black -rotate-2 select-none">
                BRAINROT
                <span
                  className="block font-display text-[clamp(2.65rem,10vw,4.5rem)] text-[#111111] tracking-wider mt-1"
                  style={{ WebkitTextStroke: '0px', textShadow: '4px 4px 0px #fff9ec' }}
                >
                  VERSE.
                </span>
              </h1>

              <p className="mt-3 sm:mt-4 max-w-md text-sm sm:text-base md:text-lg font-bold text-[#111111] leading-snug px-2">
                A digital playground for people whose algorithms have given up on them.
              </p>

              <div className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('feed')}
                  className="brutal-btn min-h-[46px] bg-[#ff2e88] text-white px-5 sm:px-6 py-3 rounded-full font-extrabold text-sm md:text-base tracking-wide flex items-center gap-2 cursor-pointer whitespace-nowrap"
                >
                  <span>ENTER THE VERSE</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('aura')}
                  className="brutal-btn min-h-[46px] bg-[#fff9ec] text-[#111111] px-5 sm:px-6 py-3 rounded-full font-extrabold text-sm md:text-base tracking-wide cursor-pointer whitespace-nowrap"
                >
                  FIND YOUR AURA
                </button>
              </div>
            </div>

            {/* 3. Right Hero Mascots + Stickers — Third on small/medium screens & right column on desktop */}
            <div className="lg:col-span-4 relative flex items-end justify-center pt-10 sm:pt-12 lg:pt-10 min-h-[210px] sm:min-h-[270px] lg:min-h-[340px]">
              {/* 100% COOKED sticker */}
              <div className="absolute top-1 left-2 sm:left-14 lg:left-2 z-30 -rotate-6 lg:rotate-6 bg-[#ff2e88] text-white px-2.5 sm:px-3 py-1 sm:py-1.5 brutal-border brutal-shadow-sm">
                <span className="font-marker text-xs md:text-sm tracking-wide">
                  100% COOKED.
                </span>
              </div>

              {/* Cat Banana flying top-right */}
              <img
                src="/assets/mascots/cat_banana.png"
                alt="Banana costume cat"
                className="absolute top-0 right-2 sm:right-14 lg:right-0 z-20 w-16 sm:w-24 lg:w-28 object-contain rotate-12 drop-shadow-[0_8px_10px_rgba(17,17,17,0.25)]"
                referrerPolicy="no-referrer"
              />

              <div className="relative flex items-end justify-center pt-2">
                <img
                  src="/assets/mascots/duck_chain.png"
                  alt="Duck in sunglasses and gold chain"
                  className="relative z-10 w-20 sm:w-28 lg:w-32 object-contain -mr-3 sm:-mr-5 mb-2 drop-shadow-[0_10px_12px_rgba(17,17,17,0.25)]"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/mascots/capybara_chain.png"
                  alt="Capybara with crown and gold BRAINROT chain"
                  className="relative z-20 w-32 sm:w-44 lg:w-52 object-contain drop-shadow-[0_14px_18px_rgba(17,17,17,0.3)] hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
                <img
                  src="/assets/mascots/banana_quartet.png"
                  alt="Cool banana with sunglasses"
                  className="relative z-10 w-20 sm:w-28 lg:w-36 object-contain -ml-4 sm:-ml-7 drop-shadow-[0_10px_12px_rgba(17,17,17,0.25)]"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* DO NOT FEED AFTER MIDNIGHT sticker */}
              <div className="absolute bottom-0 right-1 sm:right-8 lg:right-0 z-30 -rotate-3 bg-[#fff9ec] px-2.5 sm:px-3 py-1.5 sm:py-2 brutal-border brutal-shadow-sm max-w-[115px] sm:max-w-[140px] text-center">
                <span className="font-marker text-[10px] sm:text-xs leading-tight text-[#111111] block">
                  DO NOT FEED AFTER MIDNIGHT.
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. TRENDING TICKER BAR */}
      <section className="bg-[#fff9ec] border-b-[3px] border-[#111111]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-3 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5 lg:gap-3">
          {/* Mobile Header Row with SEE MORE right-aligned */}
          <div className="flex items-center justify-between gap-2 shrink-0">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#ff2e88] fill-[#ffe24a]" />
              <span className="font-display text-base sm:text-lg tracking-wide text-[#111111] whitespace-nowrap">
                TRENDING NOW:
              </span>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('feed')}
              className="lg:hidden brutal-btn bg-[#ff2e88] text-white px-3.5 py-1.5 rounded-full text-xs font-extrabold tracking-wide flex items-center gap-1 shrink-0 cursor-pointer whitespace-nowrap"
            >
              <span>SEE MORE</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
            </button>
          </div>

          {/* Horizontal Scrollable Ticker Strip */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full py-1">
            {TRENDING_ITEMS.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  type="button"
                  onClick={() => onOpenLabWithBase(item.labBaseId)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 min-h-[40px] rounded-full bg-white lg:bg-transparent border-2 border-[#111111] lg:border-0 hover:bg-[#ffe24a] transition-colors cursor-pointer shrink-0 whitespace-nowrap"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-7 h-7 rounded-full object-contain bg-white border-2 border-[#111111]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-bold text-xs sm:text-sm text-[#111111]">
                    {item.name}
                  </span>
                  <span className="inline-flex items-center gap-0.5 font-extrabold text-xs text-[#ff2e88] tabular-nums">
                    <Star className="w-3.5 h-3.5 fill-[#ff2e88] text-[#ff2e88]" />
                    {item.rating}
                  </span>
                </button>
                {idx < TRENDING_ITEMS.length - 1 && (
                  <span className="hidden lg:inline text-neutral-300 font-bold select-none">
                    |
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onNavigate('feed')}
            className="hidden lg:inline-flex brutal-btn bg-[#ff2e88] text-white px-4 py-1.5 rounded-full text-xs font-extrabold tracking-wide items-center gap-1.5 shrink-0 cursor-pointer whitespace-nowrap"
          >
            <span>SEE MORE</span>
            <ArrowRight className="w-3.5 h-3.5 stroke-[3]" />
          </button>
        </div>
      </section>

      {/* 3. HOT PINK FEATURE CARDS SECTION */}
      <section className="relative sunburst-pink border-b-[3px] border-[#111111] py-8 sm:py-10 md:py-14 overflow-hidden">
        <div className="absolute inset-0 halftone-dots-white pointer-events-none" />
        <div
          aria-hidden="true"
          className="hidden md:block absolute top-0 right-0 w-36 h-32 checkerboard-sm opacity-80 border-b-[3px] border-l-[3px] border-[#111111] rotate-6 translate-x-6 -translate-y-4 pointer-events-none"
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 sm:gap-8 items-center">
            {/* Left Copy + Frog Mascot */}
            <div className="xl:col-span-4 flex flex-col sm:flex-row xl:flex-col items-center xl:items-start gap-4">
              <div className="text-center sm:text-left">
                <h2 className="font-graffiti text-3xl sm:text-4xl lg:text-5xl leading-[0.95] text-[#111111] -rotate-1 sm:-rotate-2">
                  YOUR ATTENTION SPAN CALLED.
                </h2>
                <p className="mt-2 font-graffiti text-2xl sm:text-3xl lg:text-4xl leading-none text-white text-stroke-black -rotate-1">
                  IT HAS LEFT THE CHAT.
                </p>
              </div>
              <div className="relative mt-1 sm:mt-2 flex justify-center w-full sm:w-auto xl:w-full">
                <Star className="hidden sm:block absolute top-2 right-8 w-7 h-7 text-[#111111] fill-[#ffe24a] rotate-12" />
                <img
                  src="/assets/mascots/frog_quartet.png"
                  alt="Crowned frog sticking tongue out"
                  className="w-36 sm:w-44 md:w-56 object-contain drop-shadow-[0_12px_16px_rgba(17,17,17,0.32)] hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

            {/* Right 5 Feature Cards — 1 col mobile, 2 cols tablet (5th spans 2 cols), 5 cols desktop */}
            <div className="xl:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {FEATURE_CARDS.map((card, index) => {
                const isLast = index === FEATURE_CARDS.length - 1;
                return (
                  <div
                    key={card.id}
                    onClick={() => onNavigate(card.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') onNavigate(card.id);
                    }}
                    className={`${card.bg} ${card.tilt} ${
                      isLast ? 'sm:col-span-2 lg:col-span-1' : ''
                    } torn-paper-card rounded-xl p-4 sm:p-3.5 flex ${
                      isLast
                        ? 'flex-col sm:flex-row sm:items-center lg:flex-col lg:items-stretch'
                        : 'flex-col'
                    } justify-between gap-3 cursor-pointer transition-transform duration-150`}
                  >
                    <div className={isLast ? 'sm:flex-1 lg:flex-none' : ''}>
                      <h3 className="font-graffiti text-2xl leading-none text-[#111111] tracking-wide">
                        {card.title}
                      </h3>
                      <p className="mt-1.5 text-xs font-bold text-[#111111]/85 leading-snug">
                        {card.desc}
                      </p>
                      {isLast && (
                        <span className="mt-3 hidden sm:inline-flex lg:hidden min-h-[40px] py-2 px-4 rounded-full bg-[#111111] text-white text-xs font-extrabold tracking-wider items-center justify-center gap-1 whitespace-nowrap">
                          <span>{card.cta}</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div
                      className={`flex items-center justify-center ${
                        isLast ? 'my-2 sm:my-0 lg:my-2 h-24 sm:h-28' : 'my-2 h-24 sm:h-28'
                      }`}
                    >
                      <img
                        src={card.image}
                        alt={card.title}
                        className="max-h-24 sm:max-h-28 w-auto object-contain drop-shadow-[0_6px_8px_rgba(17,17,17,0.25)]"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <span
                      className={`w-full min-h-[42px] py-2 px-2.5 rounded-full bg-[#111111] text-white text-[11px] font-extrabold tracking-wider flex items-center justify-center gap-1 whitespace-nowrap ${
                        isLast ? 'sm:hidden lg:flex' : ''
                      }`}
                    >
                      <span>{card.cta}</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. BOTTOM SPLIT: CREATURE OF THE DAY + PURPLE BANNER */}
      <section className="relative bg-[#ffe24a] py-6 sm:py-8 md:py-10 overflow-hidden">
        <div className="absolute inset-0 halftone-dots pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Creature of the Day Card */}
          <div className="lg:col-span-5 bg-[#fff9ec] torn-paper-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex-1 space-y-2.5 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-wider text-[#ff2e88] uppercase">
                <Crown className="w-4 h-4 fill-[#ff2e88]" />
                <span>CREATURE OF THE DAY</span>
              </div>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h3 className="font-display text-2xl md:text-3xl text-[#111111]">
                  Tralalero Tralala
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-[#9d4edd] text-white text-[11px] font-extrabold border-2 border-[#111111]">
                  EPIC
                </span>
              </div>

              <p className="text-sm font-semibold text-neutral-700 leading-snug">
                A shark with sneakers. A legend in the making. Pure brainrot energy.
              </p>

              <p className="text-xs font-extrabold text-[#111111] flex items-center justify-center sm:justify-start gap-1">
                <Zap className="w-4 h-4 text-[#ffe24a] fill-[#ffe24a] stroke-[#111111]" />
                <span>Special Power: Street Flex</span>
              </p>

              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => onOpenLabWithBase('shark')}
                  className="brutal-btn min-h-[44px] bg-[#111111] text-white px-5 py-2.5 rounded-full text-xs font-extrabold tracking-wide inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <span>VIEW IN LAB</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="shrink-0 relative">
              <Star className="absolute -top-2 right-2 w-6 h-6 text-[#111111] fill-[#ffe24a]" />
              <img
                src="/assets/mascots/tralalero.png"
                alt="Creature of the Day: Tralalero Tralala"
                className="w-36 sm:w-40 md:w-48 object-contain drop-shadow-[0_10px_12px_rgba(17,17,17,0.28)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Purple "You've Scrolled This Far" Banner */}
          <div className="lg:col-span-7 bg-[#9d4edd] torn-paper-card rounded-2xl p-5 sm:p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute inset-0 halftone-dots-white opacity-40 pointer-events-none" />
            <div className="relative z-10 flex-1 text-center sm:text-left">
              <h3 className="font-graffiti text-xl sm:text-2xl md:text-3xl text-[#111111] bg-[#fff9ec] inline-block px-3 py-1 border-2 border-[#111111] -rotate-1 shadow-[3px_3px_0_#111111]">
                YOU&apos;VE SCROLLED THIS FAR.
              </h3>
              <p className="mt-2 font-graffiti text-3xl sm:text-4xl md:text-5xl leading-none text-white text-stroke-black">
                YOU&apos;RE ONE OF US NOW.
              </p>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => onNavigate('challenge')}
                  className="brutal-btn min-h-[46px] bg-[#ffe24a] text-[#111111] px-6 py-3 rounded-full font-extrabold text-sm md:text-base tracking-wide inline-flex items-center gap-2 cursor-pointer"
                >
                  <span>GO FULL BRAINROT</span>
                  <ArrowRight className="w-4 h-4 stroke-[3]" />
                </button>
              </div>
            </div>

            <div className="relative z-10 shrink-0 flex items-center">
              <Heart className="absolute -top-3 -right-2 w-8 h-8 text-[#111111] fill-[#ff2e88] rotate-12" />
              <img
                src="/assets/mascots/banana_quartet.png"
                alt="Cool banana mascot pointing"
                className="w-36 sm:w-40 md:w-48 object-contain drop-shadow-[0_10px_14px_rgba(17,17,17,0.3)]"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
