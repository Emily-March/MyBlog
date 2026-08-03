import { NextResponse } from "next/server";
import { hasViewStore, incrementViewCount } from "@/lib/view-store";

export const dynamic = "force-dynamic";

const VALID_SLUG = /^[a-zA-Z0-9\u4e00-\u9fff_-]+$/;

export async function POST(_request, { params }) {
  const { slug } = await params;
  if (!VALID_SLUG.test(slug)) return NextResponse.json({ error: "Invalid post slug" }, { status: 400 });

  try {
    const views = await incrementViewCount(slug);
    return NextResponse.json({ views, persistent: hasViewStore() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    console.error("Failed to increment post views", error);
    return NextResponse.json({ error: "Unable to update views" }, { status: 503, headers: { "Cache-Control": "no-store" } });
  }
}
