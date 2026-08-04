"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";
import { formatMusicTime } from "./MusicCard";
import { useMusic } from "./MusicProvider";

export default function MusicPageClient() {
  const { tracks, track, index, setIndex, playing, currentTime, duration, volume, toggle, next, previous, seek, setVolume } = useMusic();
  const [tab, setTab] = useState("lyrics");
  const [lyrics, setLyrics] = useState([]);

  useEffect(() => {
    if (!track?.lyric) return setLyrics([]);
    fetch(track.lyric).then((response) => response.text()).then((text) => {
      setLyrics(text.split("\n").map((line) => {
        const match = line.match(/^\[(\d+):(\d+(?:\.\d+)?)\](.*)$/);
        return match ? { time: Number(match[1]) * 60 + Number(match[2]), text: match[3].trim() } : null;
      }).filter((line) => line?.text));
    }).catch(() => setLyrics([]));
  }, [track?.lyric]);

  const activeLyric = lyrics.reduce((found, line) => line.time <= currentTime ? line : found, null);
  const progress = duration ? Math.min(100, currentTime / duration * 100) : 0;

  return (
    <main className="music-page page-shell">
      <header className="music-page-heading"><span>MY MUSIC</span><h1>云端乐律</h1><p>让音乐经过耳畔，也让片刻被好好收藏。</p></header>
      <section className="music-stage surface">
        <div className="music-player-panel">
          <div className={`large-record${playing ? " is-playing" : ""}`}>
            {track?.cover ? <img src={track.cover} alt={`${track.title}封面`} /> : <div className="record-placeholder"><Icon name="music" size={52} /></div>}
            <i />
          </div>
          <div className="music-now"><h2>{track?.title || "歌单还是空的"}</h2><p>{track?.artist || "添加第一首喜欢的音乐吧"}</p></div>
          <input className="music-progress" type="range" min="0" max={duration || 100} value={duration ? currentTime : 0} onChange={(event) => seek(Number(event.target.value))} disabled={!track} style={{ "--progress": `${progress}%` }} aria-label="播放进度" />
          <div className="music-time"><span>{formatMusicTime(currentTime)}</span><span>{formatMusicTime(duration)}</span></div>
          <div className="music-controls">
            <button aria-label="循环播放" disabled={!tracks.length}><Icon name="repeat" /></button>
            <button onClick={previous} aria-label="上一首" disabled={!tracks.length}><Icon name="previous" /></button>
            <button className="music-play-button large" onClick={toggle} aria-label={playing ? "暂停" : "播放"} disabled={!track}><Icon name={playing ? "pause" : "play"} size={28} /></button>
            <button onClick={next} aria-label="下一首" disabled={!tracks.length}><Icon name="next" /></button>
            <label className="volume-control"><Icon name="volume" /><input type="range" min="0" max="1" step=".05" value={volume} onChange={(event) => setVolume(event.target.value)} aria-label="音量" /></label>
          </div>
        </div>
        <div className="music-detail-panel">
          <div className="music-tabs"><button className={tab === "lyrics" ? "active" : ""} onClick={() => setTab("lyrics")}>歌词</button><button className={tab === "playlist" ? "active" : ""} onClick={() => setTab("playlist")}>歌单</button></div>
          {tab === "lyrics" ? (
            <div className="lyrics-panel">
              {lyrics.length ? lyrics.map((line) => <button className={activeLyric === line ? "active" : ""} onClick={() => seek(line.time)} key={`${line.time}-${line.text}`}>{line.text}</button>) : <div className="music-empty"><Icon name="music" size={30} /><strong>{track ? "这首歌暂时没有歌词" : "等待你的第一份歌单"}</strong><p>准备好音频、封面与歌曲信息后，我会帮你接入。</p></div>}
            </div>
          ) : (
            <div className="playlist-panel">{tracks.length ? tracks.map((item, itemIndex) => <button className={itemIndex === index ? "active" : ""} onClick={() => setIndex(itemIndex)} key={item.id}><span>{String(itemIndex + 1).padStart(2, "0")}</span><div><strong>{item.title}</strong><small>{item.artist}</small></div><Icon name="play" /></button>) : <div className="music-empty"><strong>歌单为空</strong><p>之后添加的歌曲会统一出现在这里。</p></div>}</div>
          )}
        </div>
      </section>
    </main>
  );
}
