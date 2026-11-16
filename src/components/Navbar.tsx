import React, { useState } from 'react';
import {
  Crown,
  Flame,
  FlaskConical,
  Home,
  Image as ImageIcon,
  Menu,
  Trophy,
  X,
} from 'lucide-react';
import { PageId } from '../types';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  userAvatar: string;
  username: string;
}

const NAV_ITEMS: {
  id: PageId;
  label: string;
  icon: React.FC<{ className?: string }>;
  iconColor: string;
}[] = [
  { id: 'home', label: 'HOME', icon: Home, iconColor: 'text-[#ff2e88]' },
  { id: 'feed', label: 'THE FEED', icon: Flame, iconColor: 'text-orange-500' },
  { id: 'lab', label: 'CREATURE LAB', icon: FlaskConical, iconColor: 'text-sky-500' },
  { id: 'meme', label: 'MEME FACTORY', icon: ImageIcon, iconColor: 'text-purple-600' },
  { id: 'challenge', label: 'CHALLENGE', icon: Trophy, iconColor: 'text-amber-500' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  userAvatar,
  username,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleNav = (page: PageId) => {
    onNavigate(page);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fff9ec] border-b-[3px] border-[#111111] shadow-[0_4px_0_rgba(17,17,17,0.18)]">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNav('home')}
          className="flex items-center gap-1.5 group cursor-pointer shrink-0 whitespace-nowrap min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#ff2e88]"
        >
          <span className="inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#ffe24a] border-2 border-[#111111] shadow-[2px_2px_0_#111111] -rotate-6 group-hover:rotate-0 transition-transform">
            <Crown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#111111] fill-[#ff2e88]" />
          </span>
          <span className="font-graffiti text-xl sm:text-2xl md:text-[28px] tracking-wide leading-none text-[#ff2e88] text-stroke-black-sm">
            BRAINROT<span className="text-[#111111]" style={{ WebkitTextStroke: '0px', textShadow: 'none' }}>VERSE™</span>
          </span>
        </button>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`relative flex items-center gap-1.5 py-1.5 text-sm font-extrabold tracking-wide whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                  active ? 'text-[#ff2e88]' : 'text-[#111111] hover:text-[#ff2e88]'
                }`}
              >
                <Icon className={`w-4 h-4 ${item.iconColor}`} />
                <span>{item.label}</span>
                {active && (
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-[#ff2e88] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Status Pill & Profile Avatar */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNav('aura')}
            title="Check how cooked your aura is"
            className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111111] text-white border-2 border-[#111111] shadow-[2px_2px_0_#ff2e88] text-xs font-extrabold tracking-wider whitespace-nowrap shrink-0 cursor-pointer hover:scale-[1.03] transition-transform"
          >
            <span className="text-[#ffe24a]">INTERNET STATUS:</span>
            <span className="text-white">COOKED</span>
            <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e] inline-block border border-white/40" />
          </button>

          <button
            type="button"
            onClick={() => handleNav('profile')}
            aria-label={`Open ${username} Profile`}
            title={`${username} — View Profile & Collection`}
            className={`relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-[3px] cursor-pointer transition-transform hover:scale-105 shrink-0 ${
              currentPage === 'profile'
                ? 'border-[#ff2e88] bg-[#ffe24a] shadow-[2px_2px_0_#ff2e88]'
                : 'border-[#111111] bg-[#ffe24a] shadow-[2px_2px_0_#111111]'
            }`}
          >
            <img
              src={userAvatar}
              alt={username}
              className="w-full h-full object-contain p-0.5"
              referrerPolicy="no-referrer"
            />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#ffe24a] border-2 border-[#111111] shadow-[2px_2px_0_#111111] cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile / Tablet Nav Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#fff9ec] border-t-[3px] border-[#111111] px-4 py-4 space-y-2 shadow-lg">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const active = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNav(item.id)}
                  className={`w-full min-h-[44px] flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border-2 text-sm font-extrabold cursor-pointer ${
                    active
                      ? 'bg-[#ff2e88] text-white border-[#111111] shadow-[2px_2px_0_#111111]'
                      : 'bg-white text-[#111111] border-[#111111] hover:bg-[#ffe24a]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => handleNav('aura')}
            className="w-full min-h-[44px] flex items-center justify-between px-4 py-2.5 rounded-xl bg-[#111111] text-white text-xs font-extrabold cursor-pointer"
          >
            <span>
              <span className="text-[#ffe24a]">INTERNET STATUS:</span> COOKED
            </span>
            <span className="inline-flex items-center gap-1.5 text-[#ffe24a]">
              <span>AURA CHECK</span>
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
