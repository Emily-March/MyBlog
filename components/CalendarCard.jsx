"use client";

import { useMemo } from "react";

const weekNames = ["日", "一", "二", "三", "四", "五", "六"];

export default function CalendarCard() {
  const today = new Date();
  const cells = useMemo(() => {
    const year = today.getFullYear();
    const month = today.getMonth();
    const start = new Date(year, month, 1).getDay();
    const days = new Date(year, month + 1, 0).getDate();
    return [...Array(start).fill(null), ...Array.from({ length: days }, (_, index) => index + 1)];
  }, [today.getFullYear(), today.getMonth()]);

  return (
    <section className="surface calendar-card">
      <div className="widget-title"><strong>{today.getFullYear()}年 {today.getMonth() + 1}月</strong><span>日历</span></div>
      <div className="calendar-grid calendar-week">{weekNames.map((day) => <span key={day}>{day}</span>)}</div>
      <div className="calendar-grid">{cells.map((day, index) => <span className={day === today.getDate() ? "today" : ""} key={`${day}-${index}`}>{day}</span>)}</div>
    </section>
  );
}
