"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteProduct,
  ProductsGetData,
} from "@/app/actions/products/products-actions";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "../product/constants";
import ActionButton from "@/components/buttons/ActionButton";
import { useState, ViewTransition } from "react";

interface ProductsTableProps {
  data: ProductsGetData[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  const [itemSearch, setItemSearch] = useState<string>("");
  const normalizedSearch = itemSearch.trim().toLowerCase();

  return (
    <ViewTransition>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-8" />
            <TableHead className="md:w-42 w-32">
              <input
                type="text"
                placeholder="...search"
                onChange={(e) => setItemSearch(e.target.value)}
                className="p-1 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
              ></input>
            </TableHead>
            <TableHead className="w-14" />
            <TableHead className="w-14" />
            <TableHead />
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>
        <TableBody>
          {data
            .filter((product) =>
              product.name.toLowerCase().includes(normalizedSearch)
            )
            .sort((a, b) =>
              a.name.localeCompare(b.name, "ru", { sensitivity: "base" })
            )
            .map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="truncate">{product.name}</TableCell>
                <TableCell>
                  {CATEGORY_UNIT.find((u) => u.value === product.unit)?.label}
                </TableCell>
                <TableCell>{product.coefficient}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {
                    CATEGORY_PRODUCT.find((c) => c.value === product.category)
                      ?.label
                  }
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {product.key || "-"}
                </TableCell>
                <TableCell>
                  <ActionButton
                    id={+product?.id!}
                    mainTag="product"
                    handleDelete={deleteProduct}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ViewTransition>
  );
}
