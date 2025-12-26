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
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface ProductsTableProps {
  data: ProductsGetData[];
}

export default function ProductsTable({ data }: ProductsTableProps) {
  const router = useRouter();
  const { data: session } = useSession();

  const isDisabled = session?.user?.role !== "ADMIN";
  return (
    <div className="w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>продукт</TableHead>
            <TableHead>коэффициент</TableHead>
            <TableHead>единица</TableHead>
            <TableHead>категория</TableHead>
            <TableHead>ключ</TableHead>
            <TableHead></TableHead>
            <TableHead></TableHead>
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
              <TableCell onClick={() => router.push(`/product/${product.id}`)}>
                <PenBoxIcon className="w-4 h-4 text-blue-700 cursor-pointer" />
              </TableCell>
              <TableCell
                onClick={() => !isDisabled && deleteProduct(+product.id!)}
              >
                <Trash2Icon className="w-4 h-4 text-red-700 cursor-pointer" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
