"use client";

import { useEffect, useRef, useState } from "react";
import Icon from "./Icon";

export default function PostViewCount({ slug, initialValue = 0 }) {
  const [views, setViews] = useState(initialValue);
  const counted = useRef(false);

  useEffect(() => {
    if (counted.current) return;
    counted.current = true;

    fetch(`/api/views/${encodeURIComponent(slug)}`, {
      method: "POST",
    })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("View update failed")))
      .then((payload) => setViews(payload.views))
      .catch(console.error);
  }, [slug]);

  return <span className="meta-item" aria-live="polite"><Icon name="eye" size={14} />{views} 次阅读</span>;
}
