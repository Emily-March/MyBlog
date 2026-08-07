"use client";

import { useEffect, useMemo, useState } from "react";

const weekNames = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarCard() {
  const [today, setToday] = useState(null);

  useEffect(() => {
    const updateToday = () => setToday(new Date());
    updateToday();
    const timer = window.setInterval(updateToday, 60_000);
    const handleVisibility = () => {
      if (document.visibilityState === "visible") updateToday();
    };
    window.addEventListener("focus", updateToday);
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", updateToday);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const year = today?.getFullYear();
  const month = today?.getMonth();
  const cells = useMemo(() => {
    if (year == null || month == null) return [];
    const start = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return [...Array(start).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
  }, [year, month]);

  return (
    <section className="surface calendar-card">
      <div className="widget-title"><strong>{today ? `${year}年 ${month + 1}月` : "日期加载中"}</strong><span>日历</span></div>
      <div className="calendar-grid calendar-week">{weekNames.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid">{cells.map((day, index) => <span className={day === today?.getDate() ? "today" : ""} key={`${day}-${index}`}>{day}</span>)}</div>
    </section>
  );
}
