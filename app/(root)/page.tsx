import ProductList from "@/components/shared/product/product-list";
import sampleData from "@/db/sample-data";


export default async function  Home() {
  console.log(sampleData);
  return (
    <div>

      <ProductList data={sampleData.products} title="new"/>
    </div>
  );
}
