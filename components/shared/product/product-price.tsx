import { cn } from "@/lib/utils";

const ProductPrice = ({
  value,
  className,
}: {
  value: number;
  className?: string;
}) => {
  //Ensure two decimal places
  const stringValue = value.toFixed(2);
  //Get the int/float
  const [int, dec] = stringValue.split(".");

  return <p className={cn("text-2xl", className)}>
    <span className="text-xs align-super">MAD</span>
    {int}
    <span className="text-xs align-super">.{dec}</span>
  </p>;
};

export default ProductPrice;
