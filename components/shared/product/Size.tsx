"use client";
import { useStoreText } from "@/components/shared/store-language-provider";
import { Dispatch, SetStateAction } from "react";
import { cn } from "@/lib/utils";

export default function Sizes({ value, setSize, disabled = false }: { value: string; setSize: Dispatch<SetStateAction<string>>; disabled?: boolean }) {
  const t = useStoreText();
  return (
    <fieldset disabled={disabled}>
      <legend className="mb-3 text-sm font-medium">{t("Choisir une taille", "Choose a size")}</legend>
      <div className="flex flex-wrap gap-2">
        {["S", "M", "L", "XL", "DOUBLEXL"].map((size) => (
          <label key={size} className="relative cursor-pointer">
            <input type="radio" name="jersey-size" value={size} checked={value === size} onChange={() => setSize(size)} className="peer sr-only" />
            <span className={cn("flex h-12 min-w-12 items-center justify-center rounded-lg border px-3 text-sm tabular-nums transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-brand peer-disabled:cursor-wait peer-disabled:opacity-50", value === size ? "border-brand bg-brand/5 text-foreground" : "bg-background hover:bg-muted")}>
              {size === "DOUBLEXL" ? "2XL" : size}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
