import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";
import { getLatestProducts } from "@/lib/actions/product.actions";
import { LATEST_PRODUCTS_LIMIT } from "@/lib/constants";

export default async function Home() {
  const product = await getLatestProducts();

  return (
    <div>
      <h1>Home</h1>
      <ProductList data={product} title="Newest Arrivals" limit={LATEST_PRODUCTS_LIMIT} />
    </div>
  );
}
