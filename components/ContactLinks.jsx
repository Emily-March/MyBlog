"use client";

import { useRef, useState } from "react";
import Icon from "./Icon";

function GithubIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path fill="currentColor" d="M12 .7a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2.23c-3.22.7-3.9-1.37-3.9-1.37-.52-1.34-1.28-1.69-1.28-1.69-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.57-.29-5.27-1.28-5.27-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.47.11-3.05 0 0 .96-.31 3.16 1.18A10.9 10.9 0 0 1 12 6.12c.98 0 1.95.13 2.87.39 2.2-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.71 5.38-5.29 5.67.42.36.79 1.07.79 2.16v3.25c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .7Z" />
    </svg>
  );
}

export default function ContactLinks() {
  const [message, setMessage] = useState("");
  const timer = useRef(null);

  const showMessage = (value) => {
    setMessage(value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 1800);
  };

  const copy = async (name, value) => {
    try {
      await navigator.clipboard.writeText(value);
      showMessage(`${name} 已复制：${value}`);
    } catch {
      showMessage(`${name}：${value}`);
    }
  };

  return (
    <>
      <div className="contact-row" aria-label="联系方式">
        <a className="contact-button" href="https://github.com/Emily-March" target="_blank" rel="noreferrer" aria-label="访问 Emily 的 GitHub" data-label="GitHub · Emily-March"><GithubIcon /></a>
        <a className="contact-button" href="mailto:13295863288@163.com" aria-label="发送邮件给 Emily" data-label="邮箱 · 13295863288@163.com"><Icon name="mail" /></a>
        <button className="contact-button" type="button" onClick={() => copy("QQ", "1559405453")} aria-label="复制 QQ 号" data-label="QQ · 1559405453"><Icon name="chat" /></button>
        <button className="contact-button" type="button" onClick={() => copy("微信", "w2954977552")} aria-label="复制微信号" data-label="微信 · w2954977552"><Icon name="chats" /></button>
      </div>
      <div className={`copy-toast${message ? " show" : ""}`} role="status" aria-live="polite">{message}</div>
    </>
  );
}
