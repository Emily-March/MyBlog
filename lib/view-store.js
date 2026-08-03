const VIEW_KEY_PREFIX = "post:views:";

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function runRedisCommand(command) {
  const config = redisConfig();
  if (!config) return null;

  const response = await fetch(config.url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
  });

  if (!response.ok) throw new Error(`View store request failed with ${response.status}`);
  const payload = await response.json();
  if (payload.error) throw new Error(payload.error);
  return payload.result;
}

function viewKey(slug) {
  return `${VIEW_KEY_PREFIX}${slug}`;
}

export function hasViewStore() {
  return Boolean(redisConfig());
}

export async function getViewCounts(slugs) {
  const uniqueSlugs = [...new Set(slugs)];
  if (!uniqueSlugs.length) return {};

  const result = await runRedisCommand(["MGET", ...uniqueSlugs.map(viewKey)]);
  return Object.fromEntries(uniqueSlugs.map((slug, index) => [slug, Number(result?.[index] || 0)]));
}

export async function incrementViewCount(slug) {
  const result = await runRedisCommand(["INCR", viewKey(slug)]);
  return Number(result || 0);
}
