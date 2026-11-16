import React, { useState } from 'react';
import {
  Brain,
  Crown,
  Download,
  Edit3,
  Flame,
  FlaskConical,
  Heart,
  Image as ImageIcon,
  Plus,
  Trash2,
} from 'lucide-react';
import { ACHIEVEMENTS_CATALOG } from '../data/brainrotData';
import { PageId, SavedCreature, UserProfile } from '../types';
import { CreatureRender } from './CreatureRender';

interface ProfilePageProps {
  profile: UserProfile;
  creatures: SavedCreature[];
  onUpdateUsername: (name: string) => void;
  onUpdateAvatar: (avatar: string) => void;
  onToggleFavoriteCreature: (id: string) => void;
  onDeleteCreature: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

const AVATAR_CHOICES = [
  '/assets/mascots/duck_chain.png',
  '/assets/mascots/capybara_chain.png',
  '/assets/mascots/tralalero.png',
  '/assets/mascots/frog_quartet.png',
  '/assets/mascots/brain_shades.png',
  '/assets/mascots/cat_shades.png',
];

export const ProfilePage: React.FC<ProfilePageProps> = ({
  profile,
  creatures,
  onUpdateUsername,
  onUpdateAvatar,
  onToggleFavoriteCreature,
  onDeleteCreature,
  onNavigate,
}) => {
  const [filterFavorites, setFilterFavorites] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.username);

  const visibleCreatures = filterFavorites
    ? creatures.filter((c) => c.favorited)
    : creatures;

  const handleSaveName = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameDraft.trim()) {
      onUpdateUsername(nameDraft.trim());
    }
    setEditingName(false);
  };

  const renderAchievementIcon = (
    icon: (typeof ACHIEVEMENTS_CATALOG)[number]['icon']
  ) => {
    switch (icon) {
      case 'flame':
        return <Flame className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'brain':
        return <Brain className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'flask':
        return <FlaskConical className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'image':
        return <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6" />;
      case 'crown':
        return <Crown className="w-5 h-5 sm:w-6 sm:h-6" />;
    }
  };

  const handleDownloadCreature = (creature: SavedCreature) => {
    const src = creature.compositeImage || creature.baseImage;
    const link = document.createElement('a');
    link.download = `${creature.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}.png`;
    link.href = src;
    link.click();
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-[#e9d5ff] via-[#f3e8ff] to-[#dbeafe] py-6 sm:py-8 md:py-10 relative overflow-hidden">
      <div className="absolute inset-0 halftone-dots pointer-events-none opacity-60" />

      <div className="relative max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 items-start">
        {/* LEFT COLUMN: YOUR PROFILE & ACHIEVEMENTS */}
        <div className="lg:col-span-5 bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 space-y-5 sm:space-y-6">
          <div>
            <h1 className="font-graffiti text-3xl sm:text-4xl text-[#111111] tracking-wide">
              YOUR PROFILE
            </h1>
          </div>

          {/* Identity Block */}
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ffe24a] brutal-border brutal-shadow-sm flex items-center justify-center overflow-hidden shrink-0">
              <img
                src={profile.avatar}
                alt={profile.username}
                className="w-14 h-14 sm:w-16 sm:h-16 object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="flex-1 min-w-0">
              {editingName ? (
                <form onSubmit={handleSaveName} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={nameDraft}
                    onChange={(e) => setNameDraft(e.target.value)}
                    maxLength={22}
                    autoFocus
                    className="w-full min-h-[40px] px-2.5 py-1 rounded-lg bg-white border-2 border-[#111111] font-extrabold text-sm"
                  />
                  <button
                    type="submit"
                    className="min-h-[40px] px-3 py-1 rounded-lg bg-[#ff2e88] text-white font-extrabold text-xs border-2 border-[#111111] cursor-pointer"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h2 className="font-display text-xl sm:text-2xl text-[#111111] truncate">
                    {profile.username}
                  </h2>
                  <Crown className="w-5 h-5 text-[#ff2e88] fill-[#ffe24a] shrink-0" />
                  <button
                    type="button"
                    onClick={() => {
                      setNameDraft(profile.username);
                      setEditingName(true);
                    }}
                    aria-label="Edit username"
                    className="min-w-[36px] min-h-[36px] inline-flex items-center justify-center rounded-md hover:bg-[#ffe24a] cursor-pointer"
                  >
                    <Edit3 className="w-4 h-4 text-neutral-600" />
                  </button>
                </div>
              )}

              <p className="text-xs sm:text-sm font-bold text-[#9d4edd]">
                {profile.lastAuraDiagnosis
                  ? `${profile.lastAuraDiagnosis.rank} (${profile.lastAuraDiagnosis.cookedPercent}% Cooked)`
                  : profile.rankTitle}
              </p>
            </div>
          </div>

          {/* Avatar Switcher */}
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-500 mb-2">
              Switch Mascot Avatar:
            </p>
            <div className="flex flex-wrap items-center gap-2">
              {AVATAR_CHOICES.map((av) => {
                const active = profile.avatar === av;
                return (
                  <button
                    key={av}
                    type="button"
                    onClick={() => onUpdateAvatar(av)}
                    className={`w-11 h-11 rounded-full border-2 border-[#111111] p-0.5 cursor-pointer transition-transform ${
                      active ? 'bg-[#ff2e88] scale-110' : 'bg-white hover:bg-[#ffe24a]'
                    }`}
                  >
                    <img
                      src={av}
                      alt="Avatar choice"
                      className="w-full h-full object-contain rounded-full"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4 Live Stats */}
          <div className="grid grid-cols-4 gap-2 bg-white p-3 sm:p-3.5 rounded-2xl border-[2.5px] border-[#111111] text-center tabular-nums">
            <div>
              <p className="font-display text-xl sm:text-2xl text-[#ff2e88] leading-none">
                {profile.totalLikes}
              </p>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-600 mt-1">
                Likes
              </p>
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl text-[#9d4edd] leading-none">
                {creatures.length}
              </p>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-600 mt-1">
                Creatures
              </p>
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl text-[#0ea5e9] leading-none">
                {profile.quizzesCompleted}
              </p>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-600 mt-1">
                Quizzes
              </p>
            </div>
            <div>
              <p className="font-display text-xl sm:text-2xl text-[#ea580c] leading-none">
                {profile.bestChallengeScore}
              </p>
              <p className="text-[10px] sm:text-[11px] font-extrabold text-neutral-600 mt-1">
                Score
              </p>
            </div>
          </div>

          {/* Achievements */}
          <div>
            <h3 className="font-display text-lg tracking-wide text-[#111111] mb-3">
              ACHIEVEMENTS
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 sm:gap-2">
              {ACHIEVEMENTS_CATALOG.map((ach) => {
                const unlocked = profile.achievements.includes(ach.id);
                return (
                  <div
                    key={ach.id}
                    title={`${ach.title}: ${ach.description}`}
                    className="flex flex-col items-center text-center gap-1.5"
                  >
                    <div
                      className={`w-12 h-12 rounded-2xl border-[2.5px] border-[#111111] flex items-center justify-center transition-all ${
                        unlocked
                          ? 'shadow-[2.5px_2.5px_0_#111111] text-[#111111]'
                          : 'bg-neutral-200 text-neutral-400 opacity-60'
                      }`}
                      style={unlocked ? { backgroundColor: ach.color } : undefined}
                    >
                      {renderAchievementIcon(ach.icon)}
                    </div>
                    <span className="text-[10px] font-extrabold leading-tight text-[#111111]">
                      {ach.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: YOUR COLLECTION */}
        <div className="lg:col-span-7 bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-3xl p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="font-graffiti text-3xl sm:text-4xl text-[#111111] tracking-wide">
                YOUR COLLECTION
              </h2>
              <p className="text-sm font-bold text-neutral-700">
                Saved Creatures ({creatures.length})
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setFilterFavorites((f) => !f)}
                className={`min-h-[42px] px-3.5 py-2 rounded-full text-xs font-extrabold border-2 border-[#111111] cursor-pointer whitespace-nowrap ${
                  filterFavorites
                    ? 'bg-[#ff2e88] text-white'
                    : 'bg-white text-[#111111] hover:bg-[#ffe24a]'
                }`}
              >
                {filterFavorites ? 'Showing Favorites' : 'View All →'}
              </button>

              <button
                type="button"
                onClick={() => onNavigate('lab')}
                className="brutal-btn min-h-[42px] bg-[#ffe24a] text-[#111111] px-4 py-2 rounded-full text-xs font-extrabold inline-flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Mutate New</span>
              </button>
            </div>
          </div>

          {visibleCreatures.length === 0 ? (
            <div className="bg-white rounded-2xl border-2 border-[#111111] p-8 text-center">
              <p className="font-bold text-neutral-600">
                No creatures match that filter yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3.5 sm:gap-4">
              {visibleCreatures.map((creature) => (
                <div
                  key={creature.id}
                  className="bg-white brutal-border brutal-shadow-sm rounded-2xl overflow-hidden flex flex-col justify-between"
                >
                  <div
                    className="h-32 sm:h-36 flex items-center justify-center p-2 border-b-2 border-[#111111] relative overflow-hidden"
                    style={{ backgroundColor: creature.bgColor }}
                  >
                    <span className="absolute top-1.5 left-1.5 z-30 px-1.5 py-0.5 rounded bg-[#111111] text-[#ffe24a] text-[9px] font-extrabold">
                      {creature.rarity}
                    </span>

                    {creature.compositeImage ? (
                      <img
                        src={creature.compositeImage}
                        alt={creature.name}
                        className="w-28 h-28 object-contain drop-shadow-[0_6px_8px_rgba(17,17,17,0.28)]"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <CreatureRender
                        baseId={creature.baseId}
                        baseImage={creature.baseImage}
                        name={creature.name}
                        elements={creature.elements}
                        customTransforms={creature.customTransforms}
                        size="sm"
                      />
                    )}
                  </div>

                  <div className="p-2.5 flex items-center justify-between gap-1">
                    <div className="min-w-0">
                      <p className="font-extrabold text-xs text-[#111111] truncate">
                        {creature.name}
                      </p>
                      <p className="text-[10px] font-bold text-neutral-500 truncate">
                        {creature.personality}
                      </p>
                    </div>

                    <div className="flex items-center gap-0.5 shrink-0">
                      <button
                        type="button"
                        onClick={() => onToggleFavoriteCreature(creature.id)}
                        aria-label={`Favorite ${creature.name}`}
                        className="min-w-[30px] min-h-[30px] inline-flex items-center justify-center rounded-full hover:bg-pink-50 cursor-pointer"
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            creature.favorited
                              ? 'fill-[#ff2e88] text-[#ff2e88]'
                              : 'text-neutral-400'
                          }`}
                        />
                      </button>

                      {creature.compositeImage && (
                        <button
                          type="button"
                          onClick={() => handleDownloadCreature(creature)}
                          aria-label={`Download ${creature.name}`}
                          title="Download PNG"
                          className="min-w-[30px] min-h-[30px] inline-flex items-center justify-center rounded-full hover:bg-amber-50 text-neutral-500 hover:text-[#111111] cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {!creature.id.startsWith('starter-') && (
                        <button
                          type="button"
                          onClick={() => onDeleteCreature(creature.id)}
                          aria-label={`Delete ${creature.name}`}
                          className="min-w-[30px] min-h-[30px] inline-flex items-center justify-center rounded-full hover:bg-red-50 text-neutral-400 hover:text-red-600 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
