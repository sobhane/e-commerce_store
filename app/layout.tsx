import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_DESCRIPTION, APP_NAME, APP_URL } from "@/lib/constants";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";
import { StoreLanguageProvider } from "@/components/shared/store-language-provider";
import { getStoreLanguage, getStoreText } from "@/lib/store-language.server";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return {
    title: APP_NAME,
    description: t(APP_DESCRIPTION, `Explore the ${APP_NAME} collection of football jerseys`),
    metadataBase: new URL("/", APP_URL),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const language = await getStoreLanguage();
  return (
    <html lang={language} suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <StoreLanguageProvider language={language}>
            {children}
            <Toaster />
          </StoreLanguageProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
