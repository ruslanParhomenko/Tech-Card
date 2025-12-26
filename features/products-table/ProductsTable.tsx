"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductsGetData } from "@/app/actions/products/products-actions";
import { CATEGORY_PRODUCT, CATEGORY_UNIT } from "../product/constants";

interface ProductsTableProps {
  data: ProductsGetData[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>продукт</TableHead>
            <TableHead>коэффициент</TableHead>
            <TableHead>единица</TableHead>
            <TableHead>категория</TableHead>
            <TableHead>ключ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.coefficient}</TableCell>
              <TableCell>
                {CATEGORY_UNIT.find((u) => u.value === product.unit)?.label}
              </TableCell>
              <TableCell>
                {
                  CATEGORY_PRODUCT.find((c) => c.value === product.category)
                    ?.label
                }
              </TableCell>
              <TableCell>{product.key || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
