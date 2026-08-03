"use client";

import { useEffect, useMemo, useState } from "react";

export default function useViewCounts(posts) {
  const slugs = useMemo(() => posts.map((post) => post.slug), [posts]);
  const slugQuery = slugs.join(",");
  const [viewCounts, setViewCounts] = useState(() => Object.fromEntries(posts.map((post) => [post.slug, post.views || 0])));

  useEffect(() => {
    if (!slugQuery) return;
    const controller = new AbortController();

    fetch(`/api/views?slugs=${encodeURIComponent(slugQuery)}`, { signal: controller.signal })
      .then((response) => response.ok ? response.json() : Promise.reject(new Error("View lookup failed")))
      .then((payload) => setViewCounts((current) => ({ ...current, ...payload.views })))
      .catch((error) => {
        if (error.name !== "AbortError") console.error(error);
      });

    return () => controller.abort();
  }, [slugQuery]);

  return viewCounts;
}
