import React from 'react';
import { Crown, Heart, Star } from 'lucide-react';
import { PageId } from '../types';

interface FooterProps {
  onNavigate: (page: PageId) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#fff9ec] border-t-[3px] border-[#111111] relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Brand */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Crown className="w-5 h-5 text-[#ff2e88] fill-[#ffe24a]" />
          <span className="font-graffiti text-2xl tracking-wide text-[#ff2e88] text-stroke-black-sm">
            BRAINROT<span className="text-[#111111]" style={{ WebkitTextStroke: '0px', textShadow: 'none' }}>VERSE™</span>
          </span>
        </button>

        {/* Nav Mirror */}
        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-extrabold tracking-wide text-[#111111]">
          <button type="button" onClick={() => onNavigate('home')} className="hover:text-[#ff2e88] cursor-pointer">
            HOME
          </button>
          <button type="button" onClick={() => onNavigate('feed')} className="hover:text-[#ff2e88] cursor-pointer">
            THE FEED
          </button>
          <button type="button" onClick={() => onNavigate('lab')} className="hover:text-[#ff2e88] cursor-pointer">
            CREATURE LAB
          </button>
          <button type="button" onClick={() => onNavigate('meme')} className="hover:text-[#ff2e88] cursor-pointer">
            MEME FACTORY
          </button>
          <button type="button" onClick={() => onNavigate('challenge')} className="hover:text-[#ff2e88] cursor-pointer">
            CHALLENGE
          </button>
          <span className="hidden md:inline text-neutral-400">|</span>
          <span className="text-neutral-600 font-semibold">
            © 2025 BRAINROTVERSE. All rights reserved. | Probably not real. But definitely iconic.
          </span>
        </div>

        {/* Stay Cooked Doodle */}
        <div className="flex items-center gap-2 shrink-0">
          <Star className="w-6 h-6 text-[#111111] fill-[#ffe24a] -rotate-12" />
          <span className="font-marker text-sm md:text-base text-[#111111] flex items-center gap-1.5">
            STAY COOKED. <Heart className="w-4 h-4 text-[#ff2e88] fill-[#ff2e88]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
