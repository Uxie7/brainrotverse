import React, { useEffect, useRef, useState } from 'react';
import {
  ChevronDown,
  Disc3,
  Music2,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { BRAINROT_TRACKS } from '../data/brainrotData';

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export const BrainrotRadio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const track = BRAINROT_TRACKS[trackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = isMuted ? 0 : volume;
  }, [volume, isMuted]);

  const startPlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    setErrorMsg(null);
    setIsLoading(true);
    try {
      await audio.play();
      setIsPlaying(true);
      setIsLoading(false);
    } catch {
      setIsPlaying(false);
      setIsLoading(false);
      setErrorMsg('Tap Play again to enable audio.');
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      void startPlayback();
    }
  };

  const selectTrack = (nextIdx: number, autoPlay = true) => {
    const bounded = (nextIdx + BRAINROT_TRACKS.length) % BRAINROT_TRACKS.length;
    const nextTrack = BRAINROT_TRACKS[bounded];
    setTrackIndex(bounded);
    setCurrentTime(0);
    setDuration(0);
    setErrorMsg(null);

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = nextTrack.url;
    audio.load();

    if (autoPlay) {
      setIsLoading(true);
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsLoading(false);
        })
        .catch(() => {
          setIsPlaying(false);
          setIsLoading(false);
          setErrorMsg('Tap Play to start this track.');
        });
    } else {
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(e.target.value);
    setCurrentTime(nextTime);
    if (audioRef.current) {
      audioRef.current.currentTime = nextTime;
    }
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-40 max-w-[calc(100vw-24px)]">
      {/* Persistent CORS-enabled streaming audio element */}
      <audio
        ref={audioRef}
        src={track.url}
        crossOrigin="anonymous"
        preload="metadata"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration || 0);
          setIsLoading(false);
        }}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onWaiting={() => setIsLoading(true)}
        onCanPlay={() => setIsLoading(false)}
        onEnded={() => selectTrack(trackIndex + 1, true)}
        onError={() => {
          setIsLoading(false);
          setIsPlaying(false);
          setErrorMsg('Stream hiccup — tap Next or Play to retry.');
        }}
      />

      {!expanded ? (
        /* Collapsed Floating Pill Bar */
        <div className="flex items-center gap-1.5 bg-[#111111] text-white p-1.5 pl-2.5 rounded-full border-[3px] border-[#111111] shadow-[4px_4px_0_#ff2e88]">
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause brainrot radio' : 'Play brainrot radio'}
            className="w-8 h-8 rounded-full bg-[#ffe24a] text-[#111111] border-2 border-[#111111] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shrink-0"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 fill-[#111111]" />
            ) : (
              <Play className="w-4 h-4 fill-[#111111] ml-0.5" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="flex items-center gap-2 pr-2.5 pl-1 py-1 cursor-pointer min-w-0"
          >
            <Disc3
              className={`w-4 h-4 text-[#ff2e88] shrink-0 ${
                isPlaying ? 'animate-spin' : ''
              }`}
            />
            <div className="text-left min-w-0 max-w-[140px] sm:max-w-[190px]">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#ffe24a] leading-none">
                {isLoading ? 'LOADING...' : isPlaying ? 'BRAINROT FM • LIVE' : 'BRAINROT FM'}
              </p>
              <p className="text-xs font-bold text-white truncate leading-tight mt-0.5">
                {track.title}
              </p>
            </div>
          </button>
        </div>
      ) : (
        /* Expanded Neo-Brutalist Cassette Radio Deck */
        <div className="w-[310px] sm:w-[340px] bg-[#fff9ec] text-[#111111] brutal-border brutal-shadow-lg rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#111111] text-white px-4 py-2.5 flex items-center justify-between border-b-[3px] border-[#111111]">
            <div className="flex items-center gap-2">
              <Music2 className="w-4 h-4 text-[#ffe24a]" />
              <span className="font-graffiti text-lg tracking-wider text-[#ffe24a]">
                BRAINROT FM
              </span>
              {isPlaying && (
                <span className="inline-flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
                  <span className="w-1 bg-[#ff2e88] rounded-full animate-pulse h-2" />
                  <span className="w-1 bg-[#ffe24a] rounded-full animate-bounce h-3" />
                  <span className="w-1 bg-[#4ade80] rounded-full animate-pulse h-2.5" />
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Minimize radio player"
              className="w-7 h-7 rounded-full bg-white/15 hover:bg-[#ff2e88] text-white flex items-center justify-center cursor-pointer transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-3.5">
            {/* Now Playing Card */}
            <div
              className="rounded-2xl border-[2.5px] border-[#111111] p-3 flex items-center gap-3 shadow-[3px_3px_0_#111111]"
              style={{ backgroundColor: track.accentColor }}
            >
              <div className="w-11 h-11 rounded-full bg-[#111111] text-[#ffe24a] flex items-center justify-center shrink-0 border-2 border-white">
                <Disc3 className={`w-6 h-6 ${isPlaying ? 'animate-spin' : ''}`} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="inline-block px-2 py-0.5 rounded-full bg-[#111111] text-white text-[9px] font-extrabold uppercase tracking-wider">
                  {track.vibe}
                </span>
                <p className="font-extrabold text-sm text-[#111111] truncate mt-0.5">
                  {track.title}
                </p>
                <p className="text-[11px] font-bold text-[#111111]/80 truncate">
                  {track.artist}
                </p>
              </div>
            </div>

            {errorMsg && (
              <p className="text-[11px] font-extrabold text-[#ff2e88] text-center">
                {errorMsg}
              </p>
            )}

            {/* Seek Scrubber */}
            <div className="space-y-1">
              <input
                type="range"
                min={0}
                max={duration || 100}
                value={Math.min(currentTime, duration || 100)}
                onChange={handleSeek}
                aria-label="Seek audio position"
                className="w-full accent-[#ff2e88] cursor-pointer h-1.5"
              />
              <div className="flex justify-between text-[10px] font-extrabold text-neutral-600 tabular-nums">
                <span>{formatTime(currentTime)}</span>
                <span>{duration ? formatTime(duration) : '--:--'}</span>
              </div>
            </div>

            {/* Transport & Volume Controls */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => selectTrack(trackIndex - 1, true)}
                  aria-label="Previous track"
                  className="w-9 h-9 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center justify-center cursor-pointer hover:bg-[#ffe24a]"
                >
                  <SkipBack className="w-4 h-4 fill-[#111111]" />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                  className="w-11 h-11 rounded-full bg-[#ff2e88] text-white border-2 border-[#111111] shadow-[2.5px_2.5px_0_#111111] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => selectTrack(trackIndex + 1, true)}
                  aria-label="Next track"
                  className="w-9 h-9 rounded-full bg-white border-2 border-[#111111] shadow-[2px_2px_0_#111111] flex items-center justify-center cursor-pointer hover:bg-[#ffe24a]"
                >
                  <SkipForward className="w-4 h-4 fill-[#111111]" />
                </button>
              </div>

              <div className="flex items-center gap-1.5 bg-white px-2.5 py-1.5 rounded-full border-2 border-[#111111]">
                <button
                  type="button"
                  onClick={() => setIsMuted((m) => !m)}
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  className="cursor-pointer text-[#111111]"
                >
                  {isMuted || volume === 0 ? (
                    <VolumeX className="w-4 h-4 text-[#ff2e88]" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(Number(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  aria-label="Volume"
                  className="w-16 accent-[#111111] cursor-pointer h-1.5"
                />
              </div>
            </div>

            {/* Tracklist */}
            <div className="pt-1 border-t-2 border-neutral-200 max-h-40 overflow-y-auto space-y-1.5 pr-1">
              {BRAINROT_TRACKS.map((t, idx) => {
                const active = idx === trackIndex;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => selectTrack(idx, true)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl border-2 border-[#111111] flex items-center justify-between gap-2 cursor-pointer transition-colors ${
                      active
                        ? 'bg-[#ffe24a] font-extrabold'
                        : 'bg-white hover:bg-neutral-100 font-bold'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="text-xs text-[#111111] truncate">{t.title}</p>
                      <p className="text-[10px] text-neutral-600 truncate">{t.vibe}</p>
                    </div>
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-[#111111] shrink-0"
                      style={{ backgroundColor: t.accentColor }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
