"use client";
import TextInput from "@/components/input/TextInput";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import {
  calculationCardDefaultValues,
  CalculationCardFormValues,
  calculationCardSchema,
} from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ProductType } from "../product/schema";
import { useEffect, useMemo, useState } from "react";
import SelectInput from "@/components/input/SelectInput";
import NumericInput from "@/components/input/NumericInput";

export default function CardForm({
  dataProduct,
}: {
  dataProduct: ProductType[];
}) {
  const [dataOptions, setDataOptions] = useState<
    { label: string; value: string }[]
  >([]);

  const form = useForm<CalculationCardFormValues>({
    resolver: zodResolver(calculationCardSchema),
    defaultValues: calculationCardDefaultValues,
    mode: "onChange",
  });

  const portion =
    useWatch({
      control: form.control,
      name: "portion",
    }) || 1;

  const recipe =
    useWatch({
      control: form.control,
      name: "recipe",
    }) || [];

  const computedValues = useMemo(() => {
    let totalBruto2 = 0;
    let totalNeto = 0;
    let totalBruto = 0;

    const values = recipe.map((r, _idx) => {
      const product = dataProduct.find((p) => p.id?.toString() === r?.name);
      const weight = Number(r?.quantity || 0);
      const coefficient = Number(product?.coefficient || 1);

      const bruto2 = weight * coefficient;
      const neto = weight * portion;
      const bruto = weight * portion * coefficient;

      totalBruto2 += bruto2;
      totalNeto += neto;
      totalBruto += bruto;

      return { bruto2, neto, bruto };
    });

    return { values, totals: { totalBruto2, totalNeto, totalBruto } };
  }, [recipe, portion, dataProduct]);

  const onSubmit: SubmitHandler<CalculationCardFormValues> = (data) => {
    console.log(data);
  };

  useEffect(() => {
    if (!dataProduct) return;
    setDataOptions(
      dataProduct.map((item) => ({
        label: item.name,
        value: item.id?.toString() ?? "",
      }))
    );
  }, [dataProduct]);

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div>
        <TextInput
          fieldLabel="Технологическая карта:"
          fieldName="cardId"
          orientation="vertical"
          clasNameInput="h-8! border-0 shadow-none border-b rounded-none"
          type="number"
        />
        <TextInput
          fieldLabel="Наименование продукта:"
          fieldName="name"
          orientation="vertical"
          clasNameInput="h-8! border-0 shadow-none border-b rounded-none"
        />
        <TextInput
          fieldLabel="Срок хранения:"
          fieldName="expirationPeriod"
          orientation="vertical"
          clasNameInput="h-8! border-0 shadow-none border-b rounded-none"
        />
      </div>

      <Table className="mb-4">
        <TableHeader>
          <TableRow>
            <TableHead colSpan={3}></TableHead>
            <TableHead colSpan={2} className="text-center">
              1 порция
            </TableHead>
            <TableHead colSpan={2} className="text-center">
              <NumericInput fieldName="portion" />
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="w-8 border-r"></TableHead>
            <TableHead className="w-40">продукт</TableHead>
            <TableHead className="text-start w-10 border-x">ед</TableHead>
            <TableHead className="text-center border-x">брутто 2</TableHead>
            <TableHead className="text-center border-x">нетто</TableHead>
            <TableHead className="text-center border-x">брутто</TableHead>
            <TableHead className="text-center">нетто</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {[...Array(18)].map((_, idx) => {
            const { bruto2, neto, bruto } = computedValues.values[idx] || {};

            return (
              <TableRow key={idx}>
                <TableCell className="p-1 border-r">{idx + 1}</TableCell>
                <TableCell className="p-0">
                  <SelectInput
                    options={dataOptions}
                    fieldName={`recipe[${idx}].name`}
                    onValueChange={(value) => {
                      const product = dataProduct.find(
                        (item) => item.id?.toString() === value
                      );

                      form.setValue(
                        `recipe[${idx}].unit` as any,
                        product?.unit ?? undefined
                      );
                    }}
                  />
                </TableCell>
                <TableCell className="border-x p-0">
                  <input
                    {...form.register(`recipe[${idx}].unit` as any)}
                    className=" text-center w-10"
                  />
                </TableCell>
                <TableCell className="border-x p-0">
                  <NumericInput
                    fieldName={`recipe[${idx}].quantity`}
                    className="border-0 shadow-none rounded-none"
                  />
                </TableCell>
                <TableCell className="border-x text-center">
                  {bruto2?.toFixed(2)}
                </TableCell>
                <TableCell className="border-x text-center">
                  {neto?.toFixed(2)}
                </TableCell>
                <TableCell className="text-center">
                  {bruto?.toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}

          <TableRow className="font-semibold">
            <TableCell colSpan={3}>Итого, кг</TableCell>
            <TableCell className="text-center">
              {computedValues.totals.totalBruto2.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              {computedValues.totals.totalNeto.toFixed(2)}
            </TableCell>
            <TableCell className="text-center">
              {computedValues.totals.totalBruto.toFixed(2)}
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Label>Технология приготовления:</Label>
      <Textarea
        className="my-4 resize-none"
        {...form.register("description")}
      />

      <TextInput
        fieldLabel="Старший повар:"
        fieldName="key"
        orientation="vertical"
        clasNameInput="h-8! border-0 shadow-none border-b rounded-none mb-4"
        disabled
      />
    </FormWrapper>
  );
}
