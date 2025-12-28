import {
  getAllCards,
  getCardsByCategory,
} from "@/app/actions/cards/cards-action";
import CardTable from "@/features/card-table/CardTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  if (!category) return null;
  const dataProduct =
    category === "all"
      ? await getAllCards()
      : await getCardsByCategory(category);
  return <CardTable data={dataProduct} />;
}
