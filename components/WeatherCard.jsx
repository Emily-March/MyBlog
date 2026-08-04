"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    fetch("/api/weather").then((response) => response.ok ? response.json() : null).then(setWeather).catch(() => setWeather(null));
  }, []);
  return (
    <section className="surface weather-card">
      <div className="widget-title"><strong><Icon name="sun" size={16} />{weather?.city || "上海"}</strong><span>实时天气</span></div>
      <div className="weather-main">
        <div><strong>{weather ? `${Math.round(weather.temperature)}°` : "--°"}</strong><p>{weather?.description || "天气加载中"}</p></div>
        <span className="weather-icon"><Icon name={weather?.cloudy ? "cloud" : "sun"} size={34} /></span>
      </div>
      <div className="weather-details"><span>体感 {weather ? `${Math.round(weather.apparent)}°` : "--"}</span><span>风速 {weather ? `${Math.round(weather.wind)} km/h` : "--"}</span></div>
    </section>
  );
}
