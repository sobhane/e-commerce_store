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
import SignUpForm from "./sign-up-form";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getStoreText();
  return { title: t("Créer un compte", "Create an account") };
}

export default async function SignUpPage(props: {
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
          <CardTitle className="text-center">{t("Créer un compte", "Create an account")}</CardTitle>
          <CardDescription className="text-center">
            {t("Entrez vos informations ci-dessous pour vous inscrire", "Enter your details to create an account")}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
