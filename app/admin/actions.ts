"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE } from "@/lib/adminAuth";
import { upsertSection, type EditableSection } from "@/lib/db";

export async function saveSectionAction(
  section: EditableSection,
  data: { uk: unknown; en: unknown },
) {
  await upsertSection(section, data);
  revalidatePath("/");
  revalidatePath("/en");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
  redirect("/admin/login");
}
