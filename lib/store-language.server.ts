import { cookies } from "next/headers";
import { storeText, type StoreLanguage } from "./store-language";

const LANGUAGE_COOKIE = "koora-language";

export async function getStoreLanguage(): Promise<StoreLanguage> {
  return (await cookies()).get(LANGUAGE_COOKIE)?.value === "en" ? "en" : "fr";
}

export async function getStoreText() {
  return storeText(await getStoreLanguage());
}

export async function setStoreLanguage(formData: FormData) {
  "use server";

  const language = formData.get("language");
  if (language !== "fr" && language !== "en") return;

  (await cookies()).set(LANGUAGE_COOKIE, language, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    httpOnly: true,
    sameSite: "lax",
  });
}
