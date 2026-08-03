import { NextResponse } from "next/server";
import { getViewCounts, hasViewStore } from "@/lib/view-store";

export const dynamic = "force-dynamic";

const VALID_SLUG = /^[a-zA-Z0-9\u4e00-\u9fff_-]+$/;

export async function GET(request) {
  const slugs = (new URL(request.url).searchParams.get("slugs") || "")
    .split(",")
    .filter((slug) => VALID_SLUG.test(slug))
    .slice(0, 100);

  try {
    const views = await getViewCounts(slugs);
    return NextResponse.json({ views, persistent: hasViewStore() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Failed to read post views", error);
    return NextResponse.json({ views: {}, persistent: false }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
