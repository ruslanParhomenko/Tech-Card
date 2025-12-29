import {
  getAllCards,
  getCardsByCategory,
} from "@/app/actions/cards/cards-action";
import EmptyPage from "@/components/page/EmptyPage";
import NotData from "@/components/page/NotData";
import CardTable from "@/features/card-table/CardTable";
import { CalculationCardType } from "@/features/card/schema";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ category: string }>;
}) {
  const { category } = await searchParams;
  if (!category) return <EmptyPage />;
  const dataProduct =
    category === "all"
      ? await getAllCards()
      : await getCardsByCategory(category);
  if (dataProduct.length === 0) return <NotData />;
  return <CardTable data={dataProduct as CalculationCardType[]} />;
}
