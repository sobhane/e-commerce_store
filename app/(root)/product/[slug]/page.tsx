import { getStoreText } from "@/lib/store-language.server";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { getMyCart } from "@/lib/actions/cart.action";
import { notFound } from "next/navigation";
import AddToCart from "@/components/shared/product/add-to-cart";
import ProductDetailContent from "@/components/shared/product/product-detail-content";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const t = await getStoreText();
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const cart = await getMyCart();

  return (
    <ProductDetailContent product={product}>
      {product.stock > 0 ? (
        <AddToCart cart={cart} item={{ productId: product.id, name: product.name, slug: product.slug, qty: 1, image: product.images[0], price: product.price, size: "S" }} />
      ) : (
        <p className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">{t("Ce maillot est actuellement épuisé", "This jersey is currently sold out")}</p>
      )}
    </ProductDetailContent>
  );
}
