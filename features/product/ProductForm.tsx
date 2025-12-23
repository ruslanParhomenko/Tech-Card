"use client";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const form = useForm();
  return (
    <FormWrapper form={form}>
      <TextInput fieldLabel="продукт" fieldName="name" clasNameInput="w-40" />
      <TextInput
        fieldLabel="коэффициент"
        fieldName="coefficient"
        clasNameInput="w-40"
      />
      <TextInput fieldLabel="единица" fieldName="unit" clasNameInput="w-40" />
    </FormWrapper>
  );
}
