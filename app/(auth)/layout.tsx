import LanguageSwitch from "@/components/shared/language-switch";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex-center min-h-screen px-4 pb-12 pt-16">
      <div className="absolute right-4 top-4"><LanguageSwitch /></div>
      {children}
    </div>
  );
}
