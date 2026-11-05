"use client";

import { createContext, useContext, type ReactNode } from "react";
import { storeText, type StoreLanguage } from "@/lib/store-language";

const StoreLanguageContext = createContext<StoreLanguage>("fr");

export function StoreLanguageProvider({ language, children }: { language: StoreLanguage; children: ReactNode }) {
  return <StoreLanguageContext.Provider value={language}>{children}</StoreLanguageContext.Provider>;
}

export function useStoreLanguage() {
  return useContext(StoreLanguageContext);
}

export function useStoreText() {
  return storeText(useStoreLanguage());
}
