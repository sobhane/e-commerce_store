import { Button } from "@/components/ui/button";
import { getStoreLanguage, setStoreLanguage } from "@/lib/store-language.server";

export default async function LanguageSwitch() {
  const nextLanguage = (await getStoreLanguage()) === "fr" ? "en" : "fr";
  const label = nextLanguage === "en" ? "English" : "Français";

  return (
    <form action={setStoreLanguage} className="shrink-0">
      <Button type="submit" name="language" value={nextLanguage} lang={nextLanguage} aria-label={label} variant="ghost" className="min-w-11 px-2 text-muted-foreground sm:px-3">
        <span className="sm:hidden" aria-hidden="true">{nextLanguage.toUpperCase()}</span>
        <span className="hidden sm:inline">{label}</span>
      </Button>
    </form>
  );
}
