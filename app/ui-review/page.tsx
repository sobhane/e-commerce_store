import { notFound } from "next/navigation";
import Header from "@/components/shared/header";
import Footer from "@/components/footer";
import ProductList from "@/components/shared/product/product-list";
import ProductDetailContent from "@/components/shared/product/product-detail-content";
import CartTable from "@/app/(root)/cart/cart-table";
import CheckoutSteps from "@/components/shared/checkout-steps";
import ShippingAddressForm from "@/app/(root)/shipping-address/shipping-address-form";
import PaymentMethodForm from "@/app/(root)/payment-methods/payment-method-form";
import sampleData from "@/db/sample-data";
import { getStoreLanguage } from "@/lib/store-language.server";
import { storeText } from "@/lib/store-language";
import { Product, CartSchema } from "@/types";

const englishProducts: Record<string, Pick<Product, "name" | "description">> = {
  "marseille-bleu": {
    name: "Marseille blue jersey",
    description: "A blue Marseille jersey with the club crest and gold detailing.",
  },
  "real-madrid-gris": {
    name: "Real Madrid grey jersey",
    description: "A grey Real Madrid jersey with the club crest and shoulder stripes.",
  },
  barcelone: {
    name: "FC Barcelona blaugrana jersey",
    description: "An FC Barcelona jersey in the club’s blue and garnet colours.",
  },
  "real-madrid-blanc": {
    name: "Real Madrid white jersey",
    description: "A white Real Madrid jersey with the club crest and black detailing.",
  },
};

export default async function UIReview({ searchParams }: { searchParams: Promise<{ screen?: string; slug?: string }> }) {
  if (process.env.NODE_ENV !== "development") notFound();

  const { screen = "catalog", slug } = await searchParams;
  const language = await getStoreLanguage();
  const t = storeText(language);
  const products: Product[] = sampleData.products.map((product) => ({
    ...product,
    ...(language === "en" ? englishProducts[product.slug] : undefined),
    category: t(product.category, "Football jersey"),
    id: `preview-${product.slug}`,
    price: product.price.toFixed(2),
    rating: String(product.rating),
    createdAt: new Date("2026-01-01"),
  }));
  const firstProduct = products[0];
  const item = {
    productId: firstProduct.id,
    name: firstProduct.name,
    slug: firstProduct.slug,
    image: firstProduct.images[0],
    price: firstProduct.price,
    qty: 2,
    size: "M" as const,
  };
  const total = (Number(item.price) * item.qty).toFixed(2);
  const cart: CartSchema = { items: [item], itemsPrice: total, shippingPrice: "0.00", totalPrice: total, sessionCartId: "ui-review" };

  const product = slug ? products.find((entry) => entry.slug === slug) : firstProduct;
  if (screen === "product" && !product) notFound();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main id="main-content" className="wrapper flex-1 pb-16 pt-6 sm:pt-8">
        <p className="mb-4 text-sm text-muted-foreground">{t("Aperçu · Données de démonstration", "Preview · Sample data")}</p>
        {screen === "catalog" && (
          <ProductList data={products} title={t("Nouveautés", "New arrivals")} productHref={(slug) => `/ui-review?screen=product&slug=${encodeURIComponent(slug)}`} />
        )}
        {screen === "product" && product && (
          <ProductDetailContent product={product} collectionHref="/ui-review">
            <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">{t("Maillot de démonstration · Achat indisponible", "Sample jersey · Unavailable for purchase")}</p>
          </ProductDetailContent>
        )}
        {screen === "cart" && <CartTable cart={cart} />}
        {screen === "empty" && <CartTable />}
        {screen === "shipping" && <><CheckoutSteps current={1} /><ShippingAddressForm address={{ fullName: "", city: "", phoneNumber: "", streetAddress: "" }} /></>}
        {screen === "payment" && <><CheckoutSteps current={2} /><PaymentMethodForm preferredPaymentMethod={null} /></>}
      </main>
      <Footer />
    </div>
  );
}
