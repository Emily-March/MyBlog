"use client";

import Link from "next/link";
import Icon from "./Icon";
import { useMusic } from "./MusicProvider";

export function formatMusicTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const minutes = Math.floor(value / 60);
  const seconds = Math.floor(value % 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function MusicCard() {
  const { track, tracks, playing, currentTime, duration, toggle, next, previous, seek } = useMusic();
  const progress = duration ? Math.min(100, currentTime / duration * 100) : 0;

  return (
    <section className="surface home-music-card">
      <Link className="music-card-head" href="/music">
        <span>云端乐律</span><small>进入音乐页 →</small>
      </Link>
      <div className="music-card-main">
        <div className={`mini-record${playing ? " is-playing" : ""}`}>
          {track?.cover ? <img src={track.cover} alt="" /> : <Icon name="music" size={28} />}
          <i />
        </div>
        <div className="mini-track-copy">
          <strong>{track?.title || "等待添加歌单"}</strong>
          <span>{track?.artist || "准备好音乐后即可播放"}</span>
        </div>
      </div>
      <p className="mini-lyric">{track ? "音乐与文字，收藏此刻的心情。" : "这里会显示当前歌词"}</p>
      <input className="music-progress" type="range" min="0" max={duration || 100} value={duration ? currentTime : 0} onChange={(event) => seek(Number(event.target.value))} disabled={!track} style={{ "--progress": `${progress}%` }} aria-label="播放进度" />
      <div className="music-time"><span>{formatMusicTime(currentTime)}</span><span>{formatMusicTime(duration)}</span></div>
      <div className="music-controls compact">
        <button onClick={previous} disabled={!tracks.length} aria-label="上一首"><Icon name="previous" /></button>
        <button className="music-play-button" onClick={toggle} disabled={!track} aria-label={playing ? "暂停" : "播放"}><Icon name={playing ? "pause" : "play"} size={21} /></button>
        <button onClick={next} disabled={!tracks.length} aria-label="下一首"><Icon name="next" /></button>
      </div>
    </section>
  );
}
