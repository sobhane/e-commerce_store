"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export default function Sizes({
  setSize,
}: {
  setSize: Dispatch<SetStateAction<string >>;
}) {
  const onChange = (value: string) => {
    setSize(value);
  };

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Size" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sizes</SelectLabel>

          <SelectItem value="S">S</SelectItem>
          <SelectItem value="M">M</SelectItem>
          <SelectItem value="L">L</SelectItem>
          <SelectItem value="XL">XL</SelectItem>
          <SelectItem value="DOUBLEXL">2XL</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
