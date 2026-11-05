export type StoreLanguage = "fr" | "en";

export function storeText(language: StoreLanguage) {
  return (french: string, english: string) => language === "en" ? english : french;
}
