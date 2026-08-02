import { NextResponse } from "next/server";
import { getImage } from "@/lib/db";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const imageId = parseInt(id, 10);

  if (Number.isNaN(imageId)) {
    return NextResponse.json({ error: "invalid_id" }, { status: 400 });
  }

  const image = await getImage(imageId);

  if (!image) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return new NextResponse(new Uint8Array(image.data), {
    headers: {
      "Content-Type": image.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
