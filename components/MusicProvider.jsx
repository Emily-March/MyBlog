"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { musicTracks } from "@/lib/music";

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const audioRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolumeState] = useState(.72);
  const track = musicTracks[index] || null;

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audio.volume = volume;
    audioRef.current = audio;
    const syncTime = () => setCurrentTime(audio.currentTime || 0);
    const syncDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0);
    const stop = () => setPlaying(false);
    audio.addEventListener("timeupdate", syncTime);
    audio.addEventListener("loadedmetadata", syncDuration);
    audio.addEventListener("pause", stop);
    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", syncTime);
      audio.removeEventListener("loadedmetadata", syncDuration);
      audio.removeEventListener("pause", stop);
    };
  }, []);

  const next = useCallback(() => {
    if (!musicTracks.length) return;
    setIndex((value) => (value + 1) % musicTracks.length);
  }, []);

  const previous = useCallback(() => {
    if (!musicTracks.length) return;
    setIndex((value) => (value - 1 + musicTracks.length) % musicTracks.length);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    audio.src = track.audio;
    audio.load();
    setCurrentTime(0);
    setDuration(0);
    if (playing) audio.play().catch(() => setPlaying(false));
  }, [index, track?.audio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onEnded = () => next();
    audio.addEventListener("ended", onEnded);
    return () => audio.removeEventListener("ended", onEnded);
  }, [next]);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    if (audio.paused) audio.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    else {
      audio.pause();
      setPlaying(false);
    }
  }, [track]);

  const seek = useCallback((time) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const setVolume = useCallback((value) => {
    const audio = audioRef.current;
    const nextVolume = Number(value);
    setVolumeState(nextVolume);
    if (audio) audio.volume = nextVolume;
  }, []);

  const value = useMemo(() => ({
    tracks: musicTracks, track, index, setIndex, playing, currentTime, duration,
    volume, toggle, next, previous, seek, setVolume,
  }), [track, index, playing, currentTime, duration, volume, toggle, next, previous, seek, setVolume]);

  return <MusicContext.Provider value={value}>{children}</MusicContext.Provider>;
}

export function useMusic() {
  const value = useContext(MusicContext);
  if (!value) throw new Error("useMusic must be used inside MusicProvider");
  return value;
}
