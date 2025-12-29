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
import { ViewTransition } from "react";
import { CalculationCardType } from "../card/schema";

export default function ProductsTable({
  data,
}: {
  data: CalculationCardType[];
}) {
  return (
    <ViewTransition>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead />
            <TableHead>карты</TableHead>
            <TableHead>категория</TableHead>
            <TableHead>выход</TableHead>
            <TableHead>id</TableHead>
            <TableHead />
            <TableHead />
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.category}</TableCell>
              <TableCell>{item.weight}</TableCell>
              <TableCell>{item.cardId}</TableCell>
              <TableCell>
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
