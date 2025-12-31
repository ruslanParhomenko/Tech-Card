"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import ActionButton from "../../components/buttons/ActionButton";
import { deleteCard } from "@/app/actions/cards/cards-action";
import { useState, ViewTransition } from "react";
import { CalculationCardType } from "../card/schema";

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  const [itemSearch, setItemSearch] = useState<string>("");
  const normalizedSearch = itemSearch.trim().toLowerCase();
  return (
    <ViewTransition>
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-6" />
            <TableHead className="md:w-70 w-60">
              <input
                type="text"
                placeholder="...search"
                onChange={(e) => setItemSearch(e.target.value)}
                className="p-1 outline-none focus:outline-none focus:ring-0 focus-visible:ring-0"
              ></input>
            </TableHead>
            <TableHead className="hidden md:table-cell">категория</TableHead>
            <TableHead className="hidden md:table-cell">выход</TableHead>
            <TableHead className="hidden md:table-cell">id</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data
            .filter((item) =>
              item.name.toLowerCase().includes(normalizedSearch)
            )
            .sort((a, b) =>
              a.name.localeCompare(b.name, "ru", { sensitivity: "base" })
            )
            .map((item: any, index: number) => (
              <TableRow key={item.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell className="truncate">{item.name}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.category}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.weight}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {item.cardId}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {format(new Date(item.createdAt), "dd.MM.yyyy")}
                </TableCell>
                <TableCell>
                  <ActionButton
                    id={item.id}
                    mainTag="card"
                    handleDelete={deleteCard}
                  />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </ViewTransition>
  );
}
