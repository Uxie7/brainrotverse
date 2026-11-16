import {
  Achievement,
  AuraDiagnosis,
  AuraQuestion,
  ChallengeQuestion,
  CreatureAnchorMap,
  CreatureBase,
  ElementId,
  FeedPost,
  SavedCreature,
  TrendingItem,
} from '../types';

export const TRENDING_ITEMS: TrendingItem[] = [
  {
    id: 'tung',
    name: 'Tung Tung Sahur',
    rating: '9.7',
    subtitle: 'The Wooden Legend',
    image: '/assets/mascots/tung_tung_sahur.png',
    labBaseId: 'tung',
  },
  {
    id: 'tralalero',
    name: 'Tralalero Tralala',
    rating: '9.5',
    subtitle: 'Legendary Shark',
    image: '/assets/mascots/tralalero.png',
    labBaseId: 'shark',
  },
  {
    id: 'ballerina',
    name: 'Ballerina Cappuccina',
    rating: '9.6',
    subtitle: 'Espresso Prima Donna',
    image: '/assets/mascots/ballerina_cappuccina.png',
    labBaseId: 'ballerina',
  },
  {
    id: 'bombardiro',
    name: 'Bombardiro Crocodilo',
    rating: '9.4',
    subtitle: 'Airborne Chaos',
    image: '/assets/mascots/bombardiro_crocodilo.png',
    labBaseId: 'shark',
  },
  {
    id: 'lirili',
    name: 'Lirili Larilà',
    rating: '9.3',
    subtitle: 'Desert Drip',
    image: '/assets/mascots/camel_chain.png',
    labBaseId: 'capybara',
  },
];

export const INITIAL_FEED_POSTS: FeedPost[] = [
  {
    id: 'post-1',
    title: 'he has never paid taxes and never will 💀',
    image: '/assets/mascots/duck_chain.png',
    bgGradient: 'linear-gradient(135deg, #38bdf8 0%, #6366f1 100%)',
    author: 'DuckLord',
    authorAvatar: '/assets/mascots/duck_chain.png',
    category: ['CREATURES', 'TRENDING'],
    likes: 122400,
    comments: [
      { id: 'c1', author: 'CapyBoss', text: 'IRS is trembling right now', time: '2m ago' },
      { id: 'c2', author: 'FrogKing', text: 'the chain weighs more than my credit score', time: '14m ago' },
    ],
  },
  {
    id: 'post-2',
    title: 'POV: your last two neurons are fighting for custody',
    image: '/assets/mascots/cow_saturn.png',
    bgGradient: 'linear-gradient(135deg, #0ea5e9 0%, #15144a 100%)',
    author: 'ChaosEnjoyer',
    authorAvatar: '/assets/mascots/cow_saturn.png',
    category: ['CHAOS', 'MEMES'],
    likes: 89200,
    comments: [
      { id: 'c3', author: 'BrainRot99', text: 'La Vaca Saturno Saturnita carried me through finals', time: '5m ago' },
    ],
  },
  {
    id: 'post-3',
    title: 'this creature knows your search history 👀',
    image: '/assets/mascots/banana_duck.png',
    bgGradient: 'linear-gradient(135deg, #ffe24a 0%, #fb923c 100%)',
    author: 'MemeDealer',
    authorAvatar: '/assets/mascots/banana_cool.png',
    category: ['MEMES', 'TRENDING'],
    likes: 210500,
    comments: [
      { id: 'c4', author: 'TungFan', text: 'please delete it immediately', time: '9m ago' },
    ],
  },
  {
    id: 'post-4',
    title: 'the council has decided you are NOT the chosen one',
    image: '/assets/mascots/llama_shades.jpg',
    bgGradient: 'linear-gradient(135deg, #f472b6 0%, #fb7185 100%)',
    author: 'LlamaMaxxing',
    authorAvatar: '/assets/mascots/capybara_chain.png',
    category: ['CHAOS', 'CREATURES'],
    likes: 14800,
    comments: [
      { id: 'c5', author: 'DogeCEO', text: 'respectfully i reject the council', time: '22m ago' },
    ],
  },
  {
    id: 'post-5',
    title: 'bro is running on 2% battery and pure delusion 💀',
    image: '/assets/mascots/tralalero.png',
    bgGradient: 'linear-gradient(135deg, #60a5fa 0%, #2563eb 100%)',
    author: 'BrainrotFan',
    authorAvatar: '/assets/mascots/tralalero.png',
    category: ['CREATURES', 'TRENDING'],
    likes: 97400,
    comments: [
      { id: 'c6', author: 'SneakerShark', text: 'blue dunks give +50 stamina', time: '1h ago' },
    ],
  },
  {
    id: 'post-6',
    title: 'when the espresso kicks in at 3:47 AM',
    image: '/assets/mascots/ballerina_cappuccina.png',
    bgGradient: 'linear-gradient(135deg, #f9a8d4 0%, #9d4edd 100%)',
    author: 'LatteSpin',
    authorAvatar: '/assets/mascots/ballerina_cappuccina.png',
    category: ['CREATURES', 'TRENDING'],
    likes: 76300,
    comments: [
      { id: 'c7', author: 'OatMilk', text: 'pirouetting straight into a brick wall', time: '31m ago' },
    ],
  },
  {
    id: 'post-7',
    title: 'me showing up to the 8am lecture in full loaf mode',
    image: '/assets/mascots/bread_cat.png',
    bgGradient: 'linear-gradient(135deg, #fde047 0%, #f59e0b 100%)',
    author: 'ToastCat',
    authorAvatar: '/assets/mascots/bread_cat.png',
    category: ['MEMES', 'CREATURES'],
    likes: 64100,
    comments: [
      { id: 'c8', author: 'ButterBoy', text: 'inbred? no, in-bread.', time: '40m ago' },
    ],
  },
  {
    id: 'post-8',
    title: '3am knock at your window. wyd?',
    image: '/assets/mascots/tung_tung_sahur.png',
    bgGradient: 'linear-gradient(135deg, #fb923c 0%, #7c2d12 100%)',
    author: 'SahurBeats',
    authorAvatar: '/assets/mascots/tung_tung_sahur.png',
    category: ['CHAOS', 'TRENDING'],
    likes: 155900,
    comments: [
      { id: 'c9', author: 'BatMan', text: 'offering him a glass of water tbh', time: '12m ago' },
    ],
  },
  {
    id: 'post-9',
    title: 'he does NOT skip vitamin C day',
    image: '/assets/mascots/buff_orange.png',
    bgGradient: 'linear-gradient(135deg, #fbbf24 0%, #ea580c 100%)',
    author: 'CitrusGains',
    authorAvatar: '/assets/mascots/buff_orange.png',
    category: ['MEMES', 'CHAOS'],
    likes: 43200,
    comments: [
      { id: 'c10', author: 'GymRat', text: 'pulp friction', time: '3h ago' },
    ],
  },
  {
    id: 'post-10',
    title: 'unbothered. moisturized. in my lane. wearing a crown.',
    image: '/assets/mascots/capybara_chain.png',
    bgGradient: 'linear-gradient(135deg, #a855f7 0%, #ff2e88 100%)',
    author: 'CapyRoyalty',
    authorAvatar: '/assets/mascots/capybara_chain.png',
    category: ['CREATURES', 'TRENDING'],
    likes: 184000,
    comments: [
      { id: 'c11', author: 'VibeCheck', text: 'zero thoughts behind those pixel shades', time: '18m ago' },
    ],
  },
];

export const AURA_QUESTIONS: AuraQuestion[] = [
  {
    id: 1,
    question: 'What do you do when someone says "we need to talk"?',
    options: [
      { label: 'Run away', points: 20 },
      { label: 'Overthink for 3 hours', points: 25 },
      { label: 'Say "it\'s fine"', points: 15 },
      { label: 'Send a meme', points: 30 },
    ],
  },
  {
    id: 2,
    question: 'Your screen time report pops up on Sunday morning. Your reaction?',
    options: [
      { label: 'Close it before my eyes focus', points: 25 },
      { label: '14 hours? Rookie numbers.', points: 30 },
      { label: 'Blame background YouTube autoplay', points: 15 },
      { label: 'Challenge myself to beat it next week', points: 35 },
    ],
  },
  {
    id: 3,
    question: 'Pick your 2:00 AM emotional support snack:',
    options: [
      { label: 'Shredded cheese straight from the bag', points: 25 },
      { label: 'Iced coffee (yes, at 2 AM)', points: 30 },
      { label: 'Three pickles and a dream', points: 20 },
      { label: 'Dry cereal out of a measuring cup', points: 35 },
    ],
  },
  {
    id: 4,
    question: 'How many browser tabs are open on your device right now?',
    options: [
      { label: 'Under 5 (suspiciously normal)', points: 10 },
      { label: '15–40 (organized chaos)', points: 20 },
      { label: 'It just shows ":D" on mobile', points: 35 },
      { label: 'Three windows, all playing different audio', points: 30 },
    ],
  },
  {
    id: 5,
    question: 'You hear "Tralalero Tralala" in public. What happens next?',
    options: [
      { label: 'Immediately smile and look for the shark', points: 35 },
      { label: 'Whisper "Bombardiro Crocodilo" back', points: 30 },
      { label: 'Pretend I didn\'t understand it', points: 15 },
      { label: 'Start doing the Cappuccina pirouette', points: 25 },
    ],
  },
];

export const AURA_DIAGNOSES: AuraDiagnosis[] = [
  {
    id: 'certified-brainrot',
    title: 'CERTIFIED BRAINROT ROYALTY',
    rank: 'Certified Brainrot',
    cookedPercent: 99,
    description:
      'Your frontal lobe has officially been replaced by a shark in blue Nike Dunks. No recovery possible—only vibes.',
    badgeColor: '#ff2e88',
    mascot: '/assets/mascots/capybara_chain.png',
  },
  {
    id: 'goblin-mode',
    title: 'TERMINALLY ONLINE GOBLIN',
    rank: 'Peak Goblin Aura',
    cookedPercent: 86,
    description:
      'You speak fluent meme, your sleep schedule is a myth, and you definitely open the fridge just to stare into the void.',
    badgeColor: '#9d4edd',
    mascot: '/assets/mascots/frog_quartet.png',
  },
  {
    id: 'chaotic-neutral',
    title: 'CHAOTIC NEUTRAL CROISSANT',
    rank: 'Mildly Unhinged',
    cookedPercent: 64,
    description:
      'You still pretend to be normal in emails, yet your camera roll is 94% cursed screenshots and 6% blurry pets.',
    badgeColor: '#ffe24a',
    mascot: '/assets/mascots/bread_cat.png',
  },
  {
    id: 'lightly-toasted',
    title: 'LIGHTLY TOASTED NORMIECORE',
    rank: 'Toasted Apprentice',
    cookedPercent: 38,
    description:
      'You touch grass occasionally, which is brave. Keep scrolling the Feed—we will get you to 100% cooked by Friday.',
    badgeColor: '#38bdf8',
    mascot: '/assets/mascots/duck_chain.png',
  },
];

export const CREATURE_BASES: CreatureBase[] = [
  { id: 'breadcat', name: 'Bread Cat', image: '/assets/mascots/bread_cat.png', speciesTag: 'Panino' },
  { id: 'catbanana', name: 'Banana Cat', image: '/assets/mascots/cat_banana.png', speciesTag: 'Bananito' },
  { id: 'tung', name: 'Tung Sahur', image: '/assets/mascots/tung_tung_sahur.png', speciesTag: 'Sahur' },
  { id: 'ballerina', name: 'Cappuccina', image: '/assets/mascots/ballerina_cappuccina.png', speciesTag: 'Latte' },
  { id: 'shark', name: 'Tralalero', image: '/assets/mascots/tralalero.png', speciesTag: 'Squalo' },
  { id: 'frog', name: 'Frog King', image: '/assets/mascots/frog_tongue.png', speciesTag: 'Froggo' },
  { id: 'capybara', name: 'Capy Boss', image: '/assets/mascots/capybara_chain.png', speciesTag: 'Capy' },
  { id: 'brain', name: 'Mega Brain', image: '/assets/mascots/brain_shades.png', speciesTag: 'Cervello' },
];

export const CREATURE_ELEMENTS: {
  id: ElementId;
  label: string;
  image: string;
  color: string;
}[] = [
  { id: 'wings', label: 'Angel Wings', image: '/assets/accessories/wings.png', color: '#e9d5ff' },
  { id: 'crown', label: 'Gold Crown', image: '/assets/accessories/crown.png', color: '#fef08a' },
  { id: 'sneakers', label: 'Blue Dunks', image: '/assets/accessories/sneakers.png', color: '#bfdbfe' },
  { id: 'tophat', label: 'Dapper Hat', image: '/assets/accessories/tophat.png', color: '#fbcfe8' },
  { id: 'shades', label: 'Pixel Shades', image: '/assets/accessories/shades.png', color: '#e2e8f0' },
  { id: 'chain', label: 'Gold Chain', image: '/assets/accessories/chain.png', color: '#fde68a' },
];

const DEFAULT_ANCHORS: CreatureAnchorMap = {
  wings: { topPct: 16, leftPct: 50, widthPct: 130, rotateDeg: 0, zLayer: 'back' },
  crown: { topPct: -11, leftPct: 50, widthPct: 38, rotateDeg: -4, zLayer: 'front' },
  tophat: { topPct: -16, leftPct: 52, widthPct: 44, rotateDeg: 6, zLayer: 'front' },
  shades: { topPct: 26, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
  chain: { topPct: 45, leftPct: 50, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
  sneakers: { topPct: 76, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
};

export const CREATURE_ANCHORS: Record<string, CreatureAnchorMap> = {
  breadcat: {
    wings: { topPct: 14, leftPct: 50, widthPct: 132, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -10, leftPct: 50, widthPct: 38, rotateDeg: -4, zLayer: 'front' },
    tophat: { topPct: -15, leftPct: 52, widthPct: 44, rotateDeg: 5, zLayer: 'front' },
    shades: { topPct: 31, leftPct: 50, widthPct: 44, rotateDeg: -2, zLayer: 'front' },
    chain: { topPct: 52, leftPct: 50, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 77, leftPct: 50, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
  },
  catbanana: {
    wings: { topPct: 16, leftPct: 50, widthPct: 132, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -6, leftPct: 48, widthPct: 36, rotateDeg: -6, zLayer: 'front' },
    tophat: { topPct: -11, leftPct: 49, widthPct: 42, rotateDeg: 6, zLayer: 'front' },
    shades: { topPct: 25, leftPct: 49, widthPct: 42, rotateDeg: -2, zLayer: 'front' },
    chain: { topPct: 44, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 78, leftPct: 50, widthPct: 44, rotateDeg: 0, zLayer: 'front' },
  },
  tung: {
    wings: { topPct: 18, leftPct: 46, widthPct: 126, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -11, leftPct: 45, widthPct: 32, rotateDeg: -3, zLayer: 'front' },
    tophat: { topPct: -15, leftPct: 46, widthPct: 36, rotateDeg: 5, zLayer: 'front' },
    shades: { topPct: 18, leftPct: 45, widthPct: 34, rotateDeg: 0, zLayer: 'front' },
    chain: { topPct: 42, leftPct: 45, widthPct: 38, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 78, leftPct: 46, widthPct: 42, rotateDeg: 0, zLayer: 'front' },
  },
  ballerina: {
    wings: { topPct: 18, leftPct: 50, widthPct: 126, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -11, leftPct: 49, widthPct: 34, rotateDeg: -5, zLayer: 'front' },
    tophat: { topPct: -15, leftPct: 50, widthPct: 40, rotateDeg: 5, zLayer: 'front' },
    shades: { topPct: 24, leftPct: 49, widthPct: 38, rotateDeg: 0, zLayer: 'front' },
    chain: { topPct: 43, leftPct: 50, widthPct: 36, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 79, leftPct: 50, widthPct: 40, rotateDeg: 0, zLayer: 'front' },
  },
  shark: {
    wings: { topPct: 14, leftPct: 50, widthPct: 128, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -9, leftPct: 56, widthPct: 36, rotateDeg: 6, zLayer: 'front' },
    tophat: { topPct: -14, leftPct: 58, widthPct: 40, rotateDeg: 8, zLayer: 'front' },
    shades: { topPct: 12, leftPct: 68, widthPct: 42, rotateDeg: -8, zLayer: 'front' },
    chain: { topPct: 40, leftPct: 58, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 76, leftPct: 54, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
  },
  frog: {
    wings: { topPct: 20, leftPct: 50, widthPct: 130, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -10, leftPct: 49, widthPct: 38, rotateDeg: -3, zLayer: 'front' },
    tophat: { topPct: -14, leftPct: 50, widthPct: 42, rotateDeg: 5, zLayer: 'front' },
    shades: { topPct: 20, leftPct: 50, widthPct: 44, rotateDeg: 0, zLayer: 'front' },
    chain: { topPct: 46, leftPct: 50, widthPct: 48, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 78, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
  },
  capybara: {
    wings: { topPct: 18, leftPct: 48, widthPct: 128, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -11, leftPct: 50, widthPct: 36, rotateDeg: -4, zLayer: 'front' },
    tophat: { topPct: -15, leftPct: 50, widthPct: 42, rotateDeg: 5, zLayer: 'front' },
    shades: { topPct: 17, leftPct: 54, widthPct: 44, rotateDeg: -5, zLayer: 'front' },
    chain: { topPct: 42, leftPct: 50, widthPct: 52, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 78, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
  },
  brain: {
    wings: { topPct: 14, leftPct: 50, widthPct: 132, rotateDeg: 0, zLayer: 'back' },
    crown: { topPct: -13, leftPct: 49, widthPct: 38, rotateDeg: -3, zLayer: 'front' },
    tophat: { topPct: -17, leftPct: 50, widthPct: 42, rotateDeg: 6, zLayer: 'front' },
    shades: { topPct: 21, leftPct: 48, widthPct: 48, rotateDeg: -3, zLayer: 'front' },
    chain: { topPct: 45, leftPct: 50, widthPct: 44, rotateDeg: 0, zLayer: 'front' },
    sneakers: { topPct: 76, leftPct: 50, widthPct: 46, rotateDeg: 0, zLayer: 'front' },
  },
};

export function getCreatureAnchors(baseId: string): CreatureAnchorMap {
  return CREATURE_ANCHORS[baseId] || DEFAULT_ANCHORS;
}

export const PERSONALITIES = [
  'Chaotic',
  'Unhinged',
  'Sigma',
  'Delusional',
  'Goblin Mode',
  'Sleep-Deprived',
];

export const INITIAL_SAVED_CREATURES: SavedCreature[] = [
  {
    id: 'starter-1',
    name: 'King Ribbitz',
    baseId: 'frog',
    baseImage: '/assets/mascots/frog_quartet.png',
    elements: ['crown', 'sneakers'],
    personality: 'Unhinged',
    rarity: 'EPIC',
    bgColor: '#bbf7d0',
    favorited: true,
    createdAt: 1730000001000,
  },
  {
    id: 'starter-2',
    name: 'Tralalero Tralala',
    baseId: 'shark',
    baseImage: '/assets/mascots/tralalero.png',
    elements: ['sneakers', 'shades'],
    personality: 'Sigma',
    rarity: 'EPIC',
    bgColor: '#bfdbfe',
    favorited: true,
    createdAt: 1730000002000,
  },
  {
    id: 'starter-3',
    name: 'Fishy Gato',
    baseId: 'breadcat',
    baseImage: '/assets/mascots/fish_cat.png',
    elements: ['wings', 'sneakers'],
    personality: 'Chaotic',
    rarity: 'MYTHIC',
    bgColor: '#fde68a',
    favorited: false,
    createdAt: 1730000003000,
  },
  {
    id: 'starter-4',
    name: 'Peely Drip',
    baseId: 'catbanana',
    baseImage: '/assets/mascots/banana_quartet.png',
    elements: ['shades', 'sneakers'],
    personality: 'Delusional',
    rarity: 'RARE',
    bgColor: '#fef08a',
    favorited: true,
    createdAt: 1730000004000,
  },
  {
    id: 'starter-5',
    name: 'Panino Meow',
    baseId: 'breadcat',
    baseImage: '/assets/mascots/bread_cat.png',
    elements: ['sneakers'],
    personality: 'Sleep-Deprived',
    rarity: 'RARE',
    bgColor: '#fecdd3',
    favorited: false,
    createdAt: 1730000005000,
  },
];

export const MEME_TEMPLATES = [
  { id: 'doge', name: 'Doge Shades', image: '/assets/mascots/doge_shades.png' },
  { id: 'shark', name: 'Tralalero', image: '/assets/mascots/tralalero.png' },
  { id: 'capy', name: 'Capy Boss', image: '/assets/mascots/capybara_chain.png' },
  { id: 'duck', name: 'Drip Duck', image: '/assets/mascots/duck_chain.png' },
  { id: 'brain', name: 'Mega Brain', image: '/assets/mascots/brain_shades.png' },
  { id: 'cat', name: 'Pixel Cat', image: '/assets/mascots/cat_shades.png' },
  { id: 'banana', name: 'Cat Banana', image: '/assets/mascots/cat_banana.png' },
  { id: 'tung', name: 'Tung Sahur', image: '/assets/mascots/tung_tung_sahur.png' },
];

export const MEME_BG_SWATCHES = [
  { id: 'pink', label: 'Hot Pink', hex: '#ff2e88' },
  { id: 'yellow', label: 'Electric Yellow', hex: '#ffe24a' },
  { id: 'blue', label: 'Arcade Blue', hex: '#38bdf8' },
  { id: 'purple', label: 'Zine Purple', hex: '#9d4edd' },
  { id: 'mint', label: 'Acid Mint', hex: '#4ade80' },
  { id: 'orange', label: 'Tangerine', hex: '#fb923c' },
  { id: 'cream', label: 'Cream Paper', hex: '#fff9ec' },
  { id: 'navy', label: 'Deep Navy', hex: '#15144a' },
];

export const CHALLENGE_QUESTIONS: ChallengeQuestion[] = [
  {
    id: 1,
    question: 'Which legendary brainrot shark wears blue Nike sneakers on three legs?',
    options: ['Tralalero Tralala', 'Bombardiro Crocodilo', 'Tung Tung Sahur', 'Cappuccino Assassino'],
    correctIndex: 0,
    mascot: '/assets/mascots/tralalero.png',
  },
  {
    id: 2,
    question: 'Who is the wooden bat-wielding legend with a 9.7 trending rating?',
    options: ['Lirili Larilà', 'Tung Tung Sahur', 'Brr Brr Patapim', 'Chimpanzini Bananini'],
    correctIndex: 1,
    mascot: '/assets/mascots/tung_tung_sahur.png',
  },
  {
    id: 3,
    question: 'What is Tralalero Tralala\'s official Special Power on BRAINROTVERSE?',
    options: ['Tax Evasion', 'Espresso Spin', 'Street Flex', 'Banana Peel'],
    correctIndex: 2,
    mascot: '/assets/mascots/shark_quartet.png',
  },
  {
    id: 4,
    question: 'Which creature is half-airplane, half-reptile and rules the skies?',
    options: ['La Vaca Saturno', 'Bombardiro Crocodilo', 'Trippi Troppi', 'Frigo Camelo'],
    correctIndex: 1,
    mascot: '/assets/mascots/bombardiro_crocodilo.png',
  },
  {
    id: 5,
    question: 'What accessory does the Brainrot Capybara wear around its neck?',
    options: ['A tiny bow tie', 'A gold BRAINROT chain', 'AirPods Max', 'A garlic necklace'],
    correctIndex: 1,
    mascot: '/assets/mascots/capybara_chain.png',
  },
  {
    id: 6,
    question: 'Ballerina Cappuccina has what drink for a head?',
    options: ['Matcha Latte', 'Iced Americano', 'Cappuccino', 'Strawberry Milk'],
    correctIndex: 2,
    mascot: '/assets/mascots/ballerina_cappuccina.png',
  },
  {
    id: 7,
    question: 'According to the top bar, what is the current INTERNET STATUS?',
    options: ['STABLE', 'COOKED', 'LOADING', 'ASLEEP'],
    correctIndex: 1,
    mascot: '/assets/mascots/brain_shades.png',
  },
  {
    id: 8,
    question: 'Finish the quote: "YOUR ATTENTION SPAN CALLED. IT HAS..."',
    options: ['Gone to sleep', 'Left the chat', 'Muted notifications', 'Joined a cult'],
    correctIndex: 1,
    mascot: '/assets/mascots/frog_quartet.png',
  },
  {
    id: 9,
    question: 'Which mascot is literally a cat wearing a slice of toast as a helmet?',
    options: ['Panino Gato', 'Bread Cat', 'Fish Cat', 'Banana Cat'],
    correctIndex: 1,
    mascot: '/assets/mascots/bread_cat.png',
  },
  {
    id: 10,
    question: 'What rule is taped on the Hero yellow collage note?',
    options: ['NO REFUNDS', 'DO NOT FEED AFTER MIDNIGHT', 'CHECK YOUR POSTURE', 'DRINK WATER'],
    correctIndex: 1,
    mascot: '/assets/mascots/duck_chain.png',
  },
];

export const ACHIEVEMENTS_CATALOG: Omit<Achievement, 'unlocked'>[] = [
  {
    id: 'first-descent',
    title: 'First Descent',
    description: 'Entered the Brainrotverse',
    color: '#ffe24a',
    icon: 'flame',
  },
  {
    id: 'aura-diagnosed',
    title: 'Aura Diagnosed',
    description: 'Completed the Aura Check quiz',
    color: '#38bdf8',
    icon: 'brain',
  },
  {
    id: 'creature-creator',
    title: 'Creature Creator',
    description: 'Mutated a custom creature in the Lab',
    color: '#a855f7',
    icon: 'flask',
  },
  {
    id: 'meme-lord',
    title: 'Meme Lord',
    description: 'Exported a meme from the Factory',
    color: '#fb923c',
    icon: 'image',
  },
  {
    id: 'certified-brainrot',
    title: 'Certified Brainrot',
    description: 'Scored 500+ in Brainrot Challenge',
    color: '#ff2e88',
    icon: 'crown',
  },
];
