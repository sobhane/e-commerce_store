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

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUpPage(props: {
  searchParams: Promise<{
    callbackUrl: string;
  }>;
}) {
  const { callbackUrl } = await props.searchParams;

  const session = await auth();

  console.log(callbackUrl);
  if (session) {
    return redirect(callbackUrl || "/");
  }
  return (
    <div className="w-full max-w-md mx-auto">
      <Card>
        <CardHeader className="space-y-4">
          <Link href="/" className="flex-center">
            <Image
              className="rounded-lg"
              src={"/images/logo.jpg"}
              alt="logo"
              width={100}
              height={100}
              priority
            />
          </Link>
          <CardTitle className="text-center">Créer un compte</CardTitle>
          <CardDescription className="text-center">
            Entrez vos informations ci-dessous pour vous inscrire
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
}
