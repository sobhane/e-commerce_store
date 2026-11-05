import { getStoreText } from "@/lib/store-language.server";
import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';
import { redirect } from 'next/navigation';

const Homepage = async () => {
  if (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL) {
    redirect('/ui-review');
  }

  const t = await getStoreText();
  const latestProducts = await getLatestProducts();

  return (
    <>
      <ProductList data={latestProducts} title={t("Nouveautés", "New arrivals")} limit={10} />
    </>
  );
};

export default Homepage;
