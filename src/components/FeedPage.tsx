import React, { useMemo, useState } from 'react';
import { Flame, Heart, MessageCircle, Search, Send, X } from 'lucide-react';
import { FeedCategory, FeedPost } from '../types';

interface FeedPageProps {
  posts: FeedPost[];
  onToggleLike: (postId: string) => void;
  onAddComment: (postId: string, text: string) => void;
}

const CATEGORIES: FeedCategory[] = ['FOR YOU', 'CREATURES', 'CHAOS', 'MEMES', 'TRENDING'];

function formatCount(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(n % 1000 >= 100 ? 1 : 0).replace(/\.0$/, '')}K`;
  }
  return String(n);
}

export const FeedPage: React.FC<FeedPageProps> = ({
  posts,
  onToggleLike,
  onAddComment,
}) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<FeedCategory>('FOR YOU');
  const [activePostId, setActivePostId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState('');

  const filteredPosts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return posts.filter((post) => {
      const catMatch =
        activeCategory === 'FOR YOU' || post.category.includes(activeCategory);
      const searchMatch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.author.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });
  }, [posts, activeCategory, search]);

  const activePost = useMemo(
    () => posts.find((p) => p.id === activePostId) || null,
    [posts, activePostId]
  );

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activePost || !commentInput.trim()) return;
    onAddComment(activePost.id, commentInput.trim());
    setCommentInput('');
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-[#fff9ec]">
      {/* Pink Torn Header Banner */}
      <section className="relative sunburst-pink border-b-[3px] border-[#111111] overflow-hidden">
        <div className="absolute inset-0 halftone-dots-white pointer-events-none" />
        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <div>
            <div className="inline-flex items-center gap-2 mb-1">
              <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-[#ffe24a] fill-[#ffe24a]" />
              <span className="font-marker text-xs uppercase tracking-widest text-[#ffe24a]">
                LIVE ROT STREAM
              </span>
            </div>
            <h1 className="font-graffiti text-4xl sm:text-5xl md:text-6xl leading-none text-[#111111] bg-[#fff9ec] inline-block px-4 py-1.5 border-[3px] border-[#111111] shadow-[5px_5px_0_#111111] -rotate-1">
              THE FEED
            </h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg font-extrabold text-white drop-shadow-[2px_2px_0_#111111]">
              Infinite brainrot. No breaks.
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 lg:w-96">
            <label htmlFor="feed-search" className="sr-only">
              Search brainrot
            </label>
            <div className="relative">
              <Search className="w-5 h-5 text-[#111111] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                id="feed-search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brainrot..."
                className="w-full min-h-[46px] pl-11 pr-4 py-2.5 rounded-full bg-white text-[#111111] placeholder:text-neutral-500 font-bold text-sm border-[3px] border-[#111111] shadow-[4px_4px_0_#111111] focus:outline-none focus:ring-2 focus:ring-[#ffe24a]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Filter Pills + Responsive Meme Grid */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6">
        <div className="flex items-center gap-2.5 mb-5 sm:mb-6 overflow-x-auto no-scrollbar sm:flex-wrap pb-1">
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-extrabold tracking-wider border-[2.5px] border-[#111111] cursor-pointer whitespace-nowrap shrink-0 transition-transform ${
                  active
                    ? 'bg-[#ff2e88] text-white shadow-[3px_3px_0_#111111] -translate-y-0.5'
                    : 'bg-white text-[#111111] shadow-[2px_2px_0_#111111] hover:bg-[#ffe24a]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {filteredPosts.length === 0 ? (
          <div className="bg-white brutal-border brutal-shadow rounded-2xl p-8 sm:p-10 text-center">
            <p className="font-graffiti text-2xl sm:text-3xl text-[#111111]">
              ZERO BRAINCELLS MATCHED THAT SEARCH.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch('');
                setActiveCategory('FOR YOU');
              }}
              className="mt-4 brutal-btn min-h-[44px] bg-[#ffe24a] px-5 py-2 rounded-full font-extrabold text-sm cursor-pointer"
            >
              RESET FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white brutal-border brutal-shadow rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                {/* Meme Visual */}
                <div
                  className="relative h-52 sm:h-56 flex items-center justify-center p-4 border-b-[3px] border-[#111111] overflow-hidden"
                  style={{ background: post.bgGradient }}
                >
                  <div className="absolute inset-0 halftone-dots-white opacity-35 pointer-events-none" />
                  <img
                    src={post.image}
                    alt={post.title}
                    className={`relative z-10 max-h-44 sm:max-h-48 w-auto object-contain drop-shadow-[0_10px_14px_rgba(17,17,17,0.35)] ${
                      post.image.endsWith('.jpg') ? 'rounded-xl border-2 border-[#111111]' : ''
                    }`}
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Caption & Actions */}
                <div className="p-3.5 flex flex-col flex-1 justify-between gap-2.5">
                  <h2 className="font-bold text-sm leading-snug text-[#111111]">
                    {post.title}
                  </h2>

                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-xs font-extrabold tabular-nums">
                      <button
                        type="button"
                        onClick={() => onToggleLike(post.id)}
                        className={`min-h-[38px] px-1.5 inline-flex items-center gap-1.5 cursor-pointer transition-transform active:scale-125 ${
                          post.likedByMe ? 'text-[#ff2e88]' : 'text-[#111111] hover:text-[#ff2e88]'
                        }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${
                            post.likedByMe
                              ? 'fill-[#ff2e88] text-[#ff2e88]'
                              : 'fill-[#ff2e88]/20 text-[#ff2e88]'
                          }`}
                        />
                        <span>{formatCount(post.likes)}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActivePostId(post.id)}
                        className="min-h-[38px] px-1.5 inline-flex items-center gap-1.5 text-[#111111] hover:text-[#9d4edd] cursor-pointer"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>{post.comments.length}</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex items-center gap-2">
                      <img
                        src={post.authorAvatar}
                        alt={post.author}
                        className="w-6 h-6 rounded-full object-contain bg-[#ffe24a] border-2 border-[#111111]"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-xs font-bold text-neutral-700 truncate">
                        {post.author}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Comment Modal / Bottom Sheet on Mobile */}
      {activePost && (
        <div
          className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={() => setActivePostId(null)}
        >
          <div
            className="w-full max-w-md bg-[#fff9ec] brutal-border brutal-shadow-lg rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#ff2e88] text-white px-5 py-3.5 border-b-[3px] border-[#111111] flex items-center justify-between shrink-0">
              <span className="font-graffiti text-2xl tracking-wide">
                COMMENTS ({activePost.comments.length})
              </span>
              <button
                type="button"
                onClick={() => setActivePostId(null)}
                aria-label="Close comments"
                className="w-10 h-10 rounded-full bg-white text-[#111111] border-2 border-[#111111] flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 sm:p-5 space-y-4 overflow-y-auto">
              <p className="font-bold text-sm text-[#111111] bg-white p-3 rounded-xl border-2 border-[#111111]">
                {activePost.title}
              </p>

              <div className="max-h-56 overflow-y-auto space-y-2.5 pr-1">
                {activePost.comments.map((c) => (
                  <div
                    key={c.id}
                    className="bg-white p-3 rounded-xl border-2 border-[#111111] text-sm"
                  >
                    <div className="flex items-center justify-between text-xs font-extrabold text-[#9d4edd]">
                      <span>@{c.author}</span>
                      <span className="text-neutral-500">{c.time}</span>
                    </div>
                    <p className="mt-1 font-semibold text-[#111111]">{c.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmitComment} className="flex gap-2">
                <input
                  type="text"
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  placeholder="Drop an unhinged reply..."
                  className="flex-1 min-h-[44px] px-3.5 py-2.5 rounded-xl bg-white border-2 border-[#111111] text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-[#ff2e88]"
                />
                <button
                  type="submit"
                  aria-label="Post comment"
                  className="brutal-btn min-w-[44px] min-h-[44px] bg-[#ffe24a] text-[#111111] px-4 py-2.5 rounded-xl font-extrabold text-sm inline-flex items-center justify-center cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
