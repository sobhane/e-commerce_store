"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.action";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const t = useStoreText();
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();

    return (
      <Button disabled={pending} className="h-12 w-full" variant="default">
        {pending ? t("Création en cours…", "Creating account…") : t("Créer mon compte", "Create account")}
      </Button>
    );
  };

  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="name">{t("Nom et prénom", "Full name")}</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            defaultValue={""}
          />
        </div>
        <div>
          <Label htmlFor="email">{t("Adresse e-mail", "Email address")}</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            defaultValue={""}
          />
        </div>
        <div>
          <Label htmlFor="password">{t("Mot de passe", "Password")}</Label>
          <Input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            defaultValue={""}
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">{t("Confirmer le mot de passe", "Confirm password")}</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            required
            autoComplete="confirmPassword"
            defaultValue={""}
          />
        </div>
        <div>
          <SignUpButton />
        </div>

        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}

        <div className="text-sm text-center text-muted-foreground">
          {t("Vous avez déjà un compte ?", "Already have an account?")}{" "}
          <Link href="/sign-in" target="_self" className="text-link text-foreground">
            {t("Se connecter", "Sign in")}
          </Link>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
