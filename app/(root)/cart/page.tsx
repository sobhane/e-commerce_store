import CartTable from "./cart-table";
import { getStoreText } from "@/lib/store-language.server";
import { getMyCart } from "@/lib/actions/cart.action";

const CartPage = async () => {
  const cart = await getMyCart();

  return (
    <>
      <CartTable cart={cart} />
    </>
  );
};

export default CartPage;
export async function generateMetadata() {
  const t = await getStoreText();
  return { title: t("Panier", "Cart") };
}
