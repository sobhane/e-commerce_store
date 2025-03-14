import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";


export default async function  Home() {
  return (
    <div>
      <h1>Home</h1>
      <ProductList data={sampleData.products} title="new"/>
    </div>
  );
}
