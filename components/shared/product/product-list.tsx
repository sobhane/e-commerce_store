interface ProductList {
  name: string;
  slug: string;
  category: string;
  description: string;
  images: string[];
  price: number;
  brand: string;
  rating: number;
  numReviews: number;
  stock: number;
  isFeatured: boolean;
  banner: string;
}
interface ProductListProps {
  product: [ProductList];
}
import ProductCard from "./product-card";

const ProductList = ({
  data,
  title,
  limit,
}: {
  data: any;
  title?: string;
  limit?: number;
}) => {
  const limitedData = limit ? data.slice(0, limit) : data;

  return (
    <div className="my-10">
      <h2 className="h2-bold">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {limitedData.map((product: any) => (
            <ProductCard
              key={product.name}
              product={product}
            ></ProductCard>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No products found</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
