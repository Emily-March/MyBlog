import { NextResponse } from "next/server";

export const revalidate = 900;

const descriptions = { 0: "晴", 1: "大致晴朗", 2: "局部多云", 3: "阴", 45: "有雾", 48: "雾凇", 51: "小雨", 53: "细雨", 55: "较强细雨", 61: "小雨", 63: "中雨", 65: "大雨", 71: "小雪", 73: "中雪", 75: "大雪", 80: "阵雨", 81: "阵雨", 82: "强阵雨", 95: "雷雨" };

export async function GET() {
  const city = process.env.WEATHER_CITY || "上海";
  const latitude = process.env.WEATHER_LATITUDE || "31.2304";
  const longitude = process.env.WEATHER_LONGITUDE || "121.4737";
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=Asia%2FShanghai`;
    const response = await fetch(url, { next: { revalidate: 900 } });
    if (!response.ok) throw new Error("weather unavailable");
    const { current } = await response.json();
    return NextResponse.json({ city, temperature: current.temperature_2m, apparent: current.apparent_temperature, wind: current.wind_speed_10m, code: current.weather_code, cloudy: current.weather_code > 1, description: descriptions[current.weather_code] || "天气变化中" });
  } catch {
    return NextResponse.json({ city, unavailable: true }, { status: 503 });
  }
}
