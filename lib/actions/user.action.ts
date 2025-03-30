"use server";

import {
  paymentMethodSchema,
  shippingAdressSchema,
  signInFormSchema,
  signUpFormSchema,
} from "../validators";
import { auth, signIn, signOut } from "@/auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { hashSync } from "bcrypt-ts-edge";
import { prisma } from "@/db/prisma";
import { formatErrors } from "../utils";
import { ShippingAdress } from "@/types";
import { z } from "zod";

// Sign in the user with credentials
export async function signInWihCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password" };
  }
}

//Sign user out

export async function signOutUser() {
  await signOut();
}

// Register the user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });
    const plainPassword = user.password;

    const hashedPassword = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: hashedPassword,
      },
    });

    await signIn("credentials", { email: user.email, password: plainPassword });

    return { success: true, message: "Account created successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: formatErrors(error) };
  }
}

// Get user by the ID
export async function getUserById(userId: string) {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!user) throw new Error("User not found");
  return user;
}

//update the user's address

export async function updateUserAddress(data: ShippingAdress) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const address = shippingAdressSchema.parse(data);
    console.log(address);
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { address },
    });

    return {
      success: true,
      message: "user updated successfully",
    };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}

// Update user's payment method

export async function updateUserPaymentMethod(
  data: z.infer<typeof paymentMethodSchema>
) {
  try {
    const session = await auth();

    const currentUser = await prisma.user.findFirst({
      where: { id: session?.user?.id },
    });

    if (!currentUser) {
      throw new Error("User not found");
    }

    const paymentMethod = paymentMethodSchema.parse(data);
    await prisma.user.update({
      where: { id: session?.user?.id },
      data: { paymentMethod: paymentMethod.type },
    });

    return { success: true, message: "User updated successfully" };
  } catch (error) {
    return { success: false, message: formatErrors(error) };
  }
}
