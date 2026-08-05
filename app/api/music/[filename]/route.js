import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function storagePath(filename) {
  const storageDirectory = process.env.MUSIC_STORAGE_DIR || (
    process.env.NODE_ENV === "production"
      ? "/opt/emilyfield-blog/shared/music"
      : path.join(/* turbopackIgnore: true */ process.cwd(), "public", "music")
  );
  return path.join(storageDirectory, filename);
}

export async function GET(request, { params }) {
  const { filename } = await params;
  if (!/^[a-z0-9][a-z0-9-]*\.mp3$/i.test(filename)) {
    return new Response("Not found", { status: 404 });
  }

  try {
    const filePath = storagePath(filename);
    const file = await stat(filePath);
    const range = request.headers.get("range");
    let start = 0;
    let end = file.size - 1;
    let status = 200;

    if (range) {
      const match = range.match(/bytes=(\d*)-(\d*)/);
      if (!match) return new Response("Invalid range", { status: 416 });
      start = match[1] ? Number(match[1]) : 0;
      end = match[2] ? Math.min(Number(match[2]), file.size - 1) : file.size - 1;
      if (start > end || start >= file.size) {
        return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${file.size}` } });
      }
      status = 206;
    }

    const stream = Readable.toWeb(createReadStream(filePath, { start, end }));
    const headers = {
      "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=86400",
      "Content-Length": String(end - start + 1),
      "Content-Type": "audio/mpeg",
    };
    if (status === 206) headers["Content-Range"] = `bytes ${start}-${end}/${file.size}`;
    return new Response(stream, { status, headers });
  } catch {
    return new Response("Audio not found", { status: 404 });
  }
}
