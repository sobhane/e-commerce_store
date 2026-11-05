import { getStoreText } from "@/lib/store-language.server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CredentialsSignInForm from "./credentials-signin-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Se connecter", "Sign in") };
}

export default async function SignInPage(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const t = await getStoreText();
  const { callbackUrl } = await props.searchParams;


  const session = await auth();

  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4 p-6 sm:p-8">
          <Link href="/" className="flex-center">
            <Image
              className="rounded-lg"
              src={"/images/logo.jpg"}
              alt="Koora Clothes"
              width={100}
              height={100}
              priority
            />
          </Link>
          <CardTitle className="text-center">{t("Se connecter", "Sign in")}</CardTitle>
          <CardDescription className="text-center">
            {t("Connectez-vous à votre compte", "Sign in to your account")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
          <CredentialsSignInForm />
        </CardContent>
      </Card>
    </div>
  );
}
