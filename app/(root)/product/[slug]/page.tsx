import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { getProductBySlug } from "@/lib/actions/product.actions";
import { notFound } from "next/navigation";
import ProductPrice from "@/components/shared/product/product-price";
import ProductImages from "@/components/shared/product/product-images";
import { Phone } from "lucide-react";
import AddToCard from "@/components/shared/product/add-to-cart";
import { getMyCart } from "@/lib/actions/cart.action";

const ProductDetailPage = async (props: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await props.params;
  const cart = await getMyCart();

  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <>
      <section>
        <div className="grid grid-cols-1 md:grid-cols-5">
          {/* Images Column */}
          <div className="col-span-2">
            <ProductImages images={product.images} />
          </div>
          {/* Details Column */}
          <div className="col-span-2 p-5">
            <div className="flex flex-col gap-6">
              <p>
                {product.brand} {product.category}
              </p>
              <h1 className="h3-bold">{product.name}</h1>
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <ProductPrice
                  value={product.price}
                  className="w-25 bg-green-200 text-green-700 rounded-full px-5 py-2"
                />
              </div>
              {/* <p>
                {product.rating} of {product.numReviews} Reviews
              </p> */}
            </div>
            <div className="mt-10">
              <p className="font-semibold">Description</p>
              {product.description}
            </div>
          </div>
          {/* Action column */}
          <div>
            <Card>
              <CardContent className="p-4 ">
                <div className="mb-2 flex justify-between">
                  <div>Price</div>
                  <div>
                    <ProductPrice value={product.price} />
                  </div>
                </div>

                <div className="mb-2 flex justify-between">
                  <div>Status</div>
                  <Badge
                    variant={product.stock > 0 ? "outline" : "destructive"}
                  >
                    {product.stock > 0 ? <p>In stock</p> : <p>Out Of Stock</p>}
                  </Badge>
                </div>
                {product.stock > 0 && (
                  <div className="flex-col justify-items-center gap-y-6">
                    <AddToCard
                      cart={cart}
                      item={{
                        productId: product.id,
                        name: product.name,
                        slug: product.slug,
                        qty: 1,
                        image: product.images![0],
                        price: product.price,
                        size:"S"
                      }}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="mt-10">
              <h1 className="font-bold text-lg md:text-base">
                Pour passer la commande sur WhatsApp:
              </h1>
              <a href="https://wa.me/212664455211" target="_blank">
                <div className="bg-green-500 rounded p-3 flex justify-center">
                  <Phone />
                  <p>+212 664-455-211</p>
                </div>
              </a>
              <a href="https://wa.me/212680610018" target="_blank">
                <div className="bg-green-500 rounded p-3 mt-4 flex justify-center">
                  <Phone />
                  <p>+212 680-610-018</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailPage;
