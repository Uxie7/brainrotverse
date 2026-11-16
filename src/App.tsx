/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { AuraCheckPage } from './components/AuraCheckPage';
import { BrainrotRadio } from './components/BrainrotRadio';
import { ChallengePage } from './components/ChallengePage';
import { CreatureLabPage } from './components/CreatureLabPage';
import { FeedPage } from './components/FeedPage';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { MemeFactoryPage } from './components/MemeFactoryPage';
import { Navbar } from './components/Navbar';
import { ProfilePage } from './components/ProfilePage';
import {
  INITIAL_FEED_POSTS,
  INITIAL_SAVED_CREATURES,
} from './data/brainrotData';
import {
  AuraDiagnosis,
  FeedPost,
  PageId,
  SavedCreature,
  UserProfile,
} from './types';

const STORAGE_KEY = 'brainrotverse_state_v1';

const DEFAULT_PROFILE: UserProfile = {
  username: 'BrainrotLegend',
  rankTitle: 'Certified Brainrot',
  avatar: '/assets/mascots/duck_chain.png',
  totalLikes: 842,
  quizzesCompleted: 15,
  memesCreated: 0,
  bestChallengeScore: 892,
  lastAuraDiagnosis: null,
  achievements: ['first-descent', 'aura-diagnosed', 'creature-creator', 'meme-lord', 'certified-brainrot'],
};

interface PersistedState {
  profile: UserProfile;
  creatures: SavedCreature[];
  posts: FeedPost[];
}

function loadInitialState(): PersistedState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedState>;
      if (parsed.profile && parsed.creatures && parsed.posts) {
        return {
          profile: parsed.profile,
          creatures: parsed.creatures,
          posts: parsed.posts,
        };
      }
    }
  } catch {
    // Fallback to initial seed state
  }
  return {
    profile: DEFAULT_PROFILE,
    creatures: INITIAL_SAVED_CREATURES,
    posts: INITIAL_FEED_POSTS,
  };
}

export default function App() {
  const [state, setState] = useState<PersistedState>(loadInitialState);
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [labInitialBase, setLabInitialBase] = useState<string | undefined>(undefined);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const navigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenLabWithBase = (baseId: string) => {
    setLabInitialBase(baseId);
    navigate('lab');
  };

  const handleToggleLike = (postId: string) => {
    setState((prev) => {
      let delta = 0;
      const nextPosts = prev.posts.map((p) => {
        if (p.id !== postId) return p;
        const nextLiked = !p.likedByMe;
        delta = nextLiked ? 1 : -1;
        return {
          ...p,
          likedByMe: nextLiked,
          likes: p.likes + delta,
        };
      });
      return {
        ...prev,
        posts: nextPosts,
        profile: {
          ...prev.profile,
          totalLikes: Math.max(0, prev.profile.totalLikes + delta),
        },
      };
    });
  };

  const handleAddComment = (postId: string, text: string) => {
    setState((prev) => ({
      ...prev,
      posts: prev.posts.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [
                ...p.comments,
                {
                  id: `comment-${Date.now()}`,
                  author: prev.profile.username,
                  text,
                  time: 'just now',
                },
              ],
            }
          : p
      ),
    }));
  };

  const unlockAchievement = (list: string[], id: string) =>
    list.includes(id) ? list : [...list, id];

  const handleCompleteAura = (diagnosis: AuraDiagnosis) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        rankTitle: diagnosis.rank,
        lastAuraDiagnosis: diagnosis,
        quizzesCompleted: prev.profile.quizzesCompleted + 1,
        achievements: unlockAchievement(prev.profile.achievements, 'aura-diagnosed'),
      },
    }));
  };

  const handleSaveCreature = (creature: SavedCreature) => {
    setState((prev) => ({
      ...prev,
      creatures: [creature, ...prev.creatures],
      profile: {
        ...prev.profile,
        achievements: unlockAchievement(prev.profile.achievements, 'creature-creator'),
      },
    }));
  };

  const handleMemeExported = () => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        memesCreated: prev.profile.memesCreated + 1,
        achievements: unlockAchievement(prev.profile.achievements, 'meme-lord'),
      },
    }));
  };

  const handleFinishChallenge = (score: number) => {
    setState((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        quizzesCompleted: prev.profile.quizzesCompleted + 1,
        bestChallengeScore: Math.max(prev.profile.bestChallengeScore, score),
        achievements:
          score >= 500
            ? unlockAchievement(prev.profile.achievements, 'certified-brainrot')
            : prev.profile.achievements,
      },
    }));
  };

  const handleUpdateUsername = (username: string) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, username },
    }));
  };

  const handleUpdateAvatar = (avatar: string) => {
    setState((prev) => ({
      ...prev,
      profile: { ...prev.profile, avatar },
    }));
  };

  const handleToggleFavoriteCreature = (id: string) => {
    setState((prev) => ({
      ...prev,
      creatures: prev.creatures.map((c) =>
        c.id === id ? { ...c, favorited: !c.favorited } : c
      ),
    }));
  };

  const handleDeleteCreature = (id: string) => {
    setState((prev) => ({
      ...prev,
      creatures: prev.creatures.filter((c) => c.id !== id),
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff9ec] text-[#111111]">
      <Navbar
        currentPage={currentPage}
        onNavigate={navigate}
        userAvatar={state.profile.avatar}
        username={state.profile.username}
      />

      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={navigate}
            onOpenLabWithBase={handleOpenLabWithBase}
          />
        )}
        {currentPage === 'feed' && (
          <FeedPage
            posts={state.posts}
            onToggleLike={handleToggleLike}
            onAddComment={handleAddComment}
          />
        )}
        {currentPage === 'aura' && (
          <AuraCheckPage
            onCompleteAura={handleCompleteAura}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'lab' && (
          <CreatureLabPage
            initialBaseId={labInitialBase}
            onSaveCreature={handleSaveCreature}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'meme' && (
          <MemeFactoryPage onMemeExported={handleMemeExported} />
        )}
        {currentPage === 'challenge' && (
          <ChallengePage
            onFinishChallenge={handleFinishChallenge}
            onNavigate={navigate}
          />
        )}
        {currentPage === 'profile' && (
          <ProfilePage
            profile={state.profile}
            creatures={state.creatures}
            onUpdateUsername={handleUpdateUsername}
            onUpdateAvatar={handleUpdateAvatar}
            onToggleFavoriteCreature={handleToggleFavoriteCreature}
            onDeleteCreature={handleDeleteCreature}
            onNavigate={navigate}
          />
        )}
      </main>

      <Footer onNavigate={navigate} />
      <BrainrotRadio />
    </div>
  );
}
