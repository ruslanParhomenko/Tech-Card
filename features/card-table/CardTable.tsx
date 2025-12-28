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

export default function ProductsTable({ data }: { data: any }) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-12.5">№</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Weight</TableHead>
          <TableHead>Card ID</TableHead>
          <TableHead>Created</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center text-muted-foreground"
            >
              Нет данных
            </TableCell>
          </TableRow>
        ) : (
          data?.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.cardId}</TableCell>
              <TableCell>
                {format(new Date(item.createdAt), "dd.MM.yyyy HH:mm")}
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
}
