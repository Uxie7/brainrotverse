export type PageId =
  | 'home'
  | 'feed'
  | 'lab'
  | 'meme'
  | 'challenge'
  | 'aura'
  | 'profile';

export type FeedCategory = 'FOR YOU' | 'CREATURES' | 'CHAOS' | 'MEMES' | 'TRENDING';

export interface FeedComment {
  id: string;
  author: string;
  text: string;
  time: string;
}

export interface FeedPost {
  id: string;
  title: string;
  image: string;
  bgGradient: string;
  author: string;
  authorAvatar: string;
  category: Exclude<FeedCategory, 'FOR YOU'>[];
  likes: number;
  comments: FeedComment[];
  likedByMe?: boolean;
}

export interface TrendingItem {
  id: string;
  name: string;
  rating: string;
  subtitle: string;
  image: string;
  labBaseId: string;
}

export interface AuraQuestion {
  id: number;
  question: string;
  options: {
    label: string;
    points: number;
  }[];
}

export interface AuraDiagnosis {
  id: string;
  title: string;
  rank: string;
  cookedPercent: number;
  description: string;
  badgeColor: string;
  mascot: string;
}

export type ElementId = 'wings' | 'crown' | 'sneakers' | 'tophat' | 'shades' | 'chain';

export interface AnchorBox {
  topPct: number;
  leftPct: number;
  widthPct: number;
  rotateDeg?: number;
  zLayer?: 'back' | 'front';
}

export interface CreatureAnchorMap {
  wings: AnchorBox;
  crown: AnchorBox;
  tophat: AnchorBox;
  shades: AnchorBox;
  chain: AnchorBox;
  sneakers: AnchorBox;
}

export interface CreatureBase {
  id: string;
  name: string;
  image: string;
  speciesTag: string;
}

export interface SavedCreature {
  id: string;
  name: string;
  baseId: string;
  baseImage: string;
  elements: ElementId[];
  personality: string;
  rarity: 'COMMON' | 'RARE' | 'EPIC' | 'MYTHIC';
  bgColor: string;
  favorited: boolean;
  createdAt: number;
  compositeImage?: string;
  customTransforms?: Partial<Record<ElementId, AnchorBox>>;
}

export interface ChallengeQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  mascot: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  color: string;
  icon: 'flame' | 'brain' | 'flask' | 'image' | 'crown';
  unlocked: boolean;
}

export interface UserProfile {
  username: string;
  rankTitle: string;
  avatar: string;
  totalLikes: number;
  quizzesCompleted: number;
  memesCreated: number;
  bestChallengeScore: number;
  lastAuraDiagnosis: AuraDiagnosis | null;
  achievements: string[];
}

export interface BrainrotTrack {
  id: string;
  title: string;
  artist: string;
  vibe: string;
  url: string;
  accentColor: string;
}
