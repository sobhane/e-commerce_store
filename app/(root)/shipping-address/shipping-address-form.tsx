"use client";

import { useStoreText } from "@/components/shared/store-language-provider";
import { ShippingAdress } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useTransition } from "react";
import { shippingAdressSchema } from "@/lib/validators";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ControllerRenderProps, useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader } from "lucide-react";
import { updateUserAddress } from "@/lib/actions/user.action";

const ShippingAddressForm = ({ address }: { address: ShippingAdress }) => {
  const t = useStoreText();
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof shippingAdressSchema>>({
    resolver: zodResolver(shippingAdressSchema),
    defaultValues: address || {
      city: "",
      fullName: "",
      phoneNumber: "",
      streetAddress: "",
    },
  });

  const [isPending, startTransition] = useTransition();
  const onSubmit: SubmitHandler<z.infer<typeof shippingAdressSchema>> = async (
    values
  ) => {
    startTransition(async () => {
      const res = await updateUserAddress(values);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
        return;
      }
      router.push("/payment-methods");
    });
  };
  return (
    <div className="checkout-panel space-y-6">
      <h1 className="h2-bold">{t("Adresse de livraison", "Shipping address")}</h1>
      <p className="text-sm leading-6 text-muted-foreground">{t("Où souhaitez-vous recevoir vos maillots ?", "Where should we deliver your jerseys?")}</p>
      <Form {...form}>
        <form
          method="post"
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="fullName"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAdressSchema>,
                  "fullName"
                >;
              }) => (
                <FormItem>
                  <FormLabel>{t("Nom et prénom", "Full name")}</FormLabel>
                  <FormControl>
                    <Input autoComplete="name" placeholder={t("Nom et prénom", "Full name")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="streetAddress"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAdressSchema>,
                  "streetAddress"
                >;
              }) => (
                <FormItem>
                  <FormLabel>{t("Adresse", "Street address")}</FormLabel>
                  <FormControl>
                    <Input autoComplete="street-address" placeholder={t("Rue, numéro et appartement", "Street, house number, and apartment")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="city"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAdressSchema>,
                  "city"
                >;
              }) => (
                <FormItem>
                  <FormLabel>{t("Ville", "City")}</FormLabel>
                  <FormControl>
                    <Input autoComplete="address-level2" placeholder={t("Votre ville", "Your city")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({
                field,
              }: {
                field: ControllerRenderProps<
                  z.infer<typeof shippingAdressSchema>,
                  "phoneNumber"
                >;
              }) => (
                <FormItem>
                  <FormLabel>{t("Numéro de téléphone", "Phone number")}</FormLabel>
                  <FormControl>
                    <Input type="tel" autoComplete="tel" placeholder="06 00 00 00 00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex gap-2">
            <Button type="submit" disabled={isPending} className="h-12 w-full">
              {isPending ? (
                <Loader className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRight className="w-4 h-4" />
              )}
              {t("Continuer vers le paiement", "Continue to payment")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ShippingAddressForm;
