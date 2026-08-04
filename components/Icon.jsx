const paths = {
  menu: ["M4 6h16", "M4 12h16", "M4 18h16"],
  close: ["M18 6 6 18", "m6 6 12 12"],
  search: ["m21 21-4.35-4.35", "M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"],
  book: ["M4 19.5A2.5 2.5 0 0 1 6.5 17H20", "M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"],
  home: ["m3 11 9-8 9 8", "M5 10v11h14V10", "M9 21v-7h6v7"],
  archive: ["M4 7h16v14H4Z", "M3 3h18v4H3Z", "M9 11h6"],
  user: ["M20 21a8 8 0 0 0-16 0", "M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"],
  calendar: ["M8 2v4", "M16 2v4", "M3 10h18", "M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"],
  clock: ["M12 6v6l4 2", "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Z"],
  eye: ["M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z", "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
  tag: ["M20 12 12 20l-9-9V4h7Z", "M7.5 8.5h.01"],
  mail: ["m4 4 8 8 8-8", "M4 4h16v16H4Z"],
  chat: ["M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"],
  chats: ["M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z", "M8 8h8", "M8 12h5"],
  arrowRight: ["M5 12h14", "m13 6 6 6-6 6"],
  arrowLeft: ["M19 12H5", "m11 18-6-6 6-6"],
  copy: ["M8 8h12v12H8Z", "M4 16H3V4h12v1"],
  music: ["M9 18V5l11-2v13", "M9 9l11-2", "M6 21a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z", "M17 19a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"],
  play: ["m8 5 11 7-11 7Z"],
  pause: ["M9 5v14", "M15 5v14"],
  previous: ["M6 5v14", "m18 6-9 6 9 6Z"],
  next: ["M18 5v14", "M6 6l9 6-9 6Z"],
  repeat: ["m17 2 4 4-4 4", "M3 11V9a3 3 0 0 1 3-3h15", "m7 22-4-4 4-4", "M21 13v2a3 3 0 0 1-3 3H3"],
  volume: ["M11 5 6 9H2v6h4l5 4Z", "M15.5 8.5a5 5 0 0 1 0 7", "M18 5a9 9 0 0 1 0 14"],
  sun: ["M12 2v2", "M12 20v2", "m4.93 4.93 1.42 1.42", "m17.66 17.66 1.41 1.41", "M2 12h2", "M20 12h2", "m6.35 17.66-1.42 1.41", "m19.07 4.93-1.41 1.42", "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"],
  cloud: ["M17.5 19H7a5 5 0 1 1 1.6-9.74A6 6 0 0 1 20 12a3.5 3.5 0 0 1-2.5 7Z"],
};

export default function Icon({ name, size = 18, className = "", ...props }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
      {...props}
    >
      {(paths[name] || []).map((d) => <path d={d} key={d} />)}
    </svg>
  );
}
