import ProductList from '@/components/shared/product/product-list';
import { getLatestProducts } from '@/lib/actions/product.actions';

const Homepage = async () => {
  const latestProducts = await getLatestProducts();
console.log(latestProducts.length)
  return (
    <>
      <ProductList data={latestProducts} title='Newest Arrivals' limit={10} />
    </>
  );
};

export default Homepage;
