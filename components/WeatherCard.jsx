"use client";

import { useEffect, useState } from "react";
import Icon from "./Icon";

const DEFAULT_CITY = "上海";

function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) return reject(new Error("geolocation unavailable"));
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      maximumAge: 10 * 60 * 1000,
      timeout: 8000,
    });
  });
}

async function reverseGeocode(latitude, longitude) {
  const params = new URLSearchParams({ localityLanguage: "zh" });
  if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
    params.set("latitude", latitude.toFixed(4));
    params.set("longitude", longitude.toFixed(4));
  }
  const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?${params}`);
  if (!response.ok) throw new Error("location unavailable");
  return response.json();
}

function locationName(location) {
  return location?.city || location?.locality || location?.principalSubdivision || location?.countryName || "当前位置";
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("正在定位");

  useEffect(() => {
    let cancelled = false;

    const requestWeather = async (latitude, longitude, resolvedCity) => {
      const params = new URLSearchParams();
      if (Number.isFinite(latitude) && Number.isFinite(longitude)) {
        params.set("latitude", latitude.toFixed(3));
        params.set("longitude", longitude.toFixed(3));
      }
      const response = await fetch(`/api/weather${params.size ? `?${params}` : ""}`);
      if (!response.ok) throw new Error("weather unavailable");
      const data = await response.json();
      if (!cancelled) {
        setWeather(data);
        setCity(resolvedCity || data.city || DEFAULT_CITY);
      }
    };

    const loadWeather = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        const location = await reverseGeocode(latitude, longitude).catch(() => null);
        await requestWeather(latitude, longitude, locationName(location));
        return;
      } catch {
        // 用户拒绝精确定位时，使用网络位置作为近似结果。
      }

      try {
        const location = await reverseGeocode();
        await requestWeather(Number(location.latitude), Number(location.longitude), locationName(location));
      } catch {
        await requestWeather(undefined, undefined, DEFAULT_CITY).catch(() => {
          if (!cancelled) {
            setWeather(null);
            setCity(DEFAULT_CITY);
          }
        });
      }
    };

    loadWeather();
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="surface weather-card">
      <div className="widget-title"><strong><Icon name="sun" size={16} />{city}</strong><span>实时天气</span></div>
      <div className="weather-main">
        <div><strong>{weather ? `${Math.round(weather.temperature)}°` : "--°"}</strong><p>{weather?.description || "天气加载中"}</p></div>
        <span className="weather-icon"><Icon name={weather?.cloudy ? "cloud" : "sun"} size={34} /></span>
      </div>
      <div className="weather-details"><span>体感 {weather ? `${Math.round(weather.apparent)}°` : "--"}</span><span>风速 {weather ? `${Math.round(weather.wind)} km/h` : "--"}</span></div>
    </section>
  );
}
