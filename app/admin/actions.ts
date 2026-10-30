"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE, safeEqual, tokenFor } from "@/lib/auth";

export async function login(formData: FormData) {
  const expected = process.env.ADMIN_PASSWORD;
  const given = formData.get("password");
  if (!expected || typeof given !== "string" || !safeEqual(tokenFor(given), tokenFor(expected))) {
    redirect("/admin?error=1");
  }

  (await cookies()).set(ADMIN_COOKIE, tokenFor(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: 60 * 60 * 24 * 7,
  });
  redirect("/admin");
}

export async function logout() {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
  redirect("/admin");
}
