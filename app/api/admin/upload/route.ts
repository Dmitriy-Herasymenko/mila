import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ADMIN_COOKIE, hashPassword } from "@/lib/adminAuth";
import { saveImage } from "@/lib/db";

const MAX_SIZE = 8 * 1024 * 1024; // 8MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"];

async function isAuthorized() {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE)?.value;
  const expected = await hashPassword(process.env.ADMIN_PASSWORD ?? "");
  return Boolean(session) && session === expected;
}

export async function POST(request: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "no_file" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return NextResponse.json({ error: "unsupported_type" }, { status: 400 });
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: "file_too_large" }, { status: 400 });
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const id = await saveImage(file.type, bytes);

  return NextResponse.json({ url: `/api/images/${id}` });
}
