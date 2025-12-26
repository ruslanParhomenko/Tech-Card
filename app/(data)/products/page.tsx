import {
  getAllProducts,
  getProductByCategory,
  ProductsGetData,
} from "@/app/actions/products/products-actions";
import { Product } from "@/app/generated/prisma/client";
import ProductsTable from "@/features/products-table/ProductsTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ categoryProduct: string }>;
}) {
  const { categoryProduct } = await searchParams;
  if (!categoryProduct) return null;
  const dataProduct =
    categoryProduct === "all"
      ? await getAllProducts()
      : await getProductByCategory(categoryProduct);
  return <ProductsTable data={dataProduct as ProductsGetData[]} />;
}
