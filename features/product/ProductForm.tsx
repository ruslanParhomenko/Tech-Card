"use client";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { useForm } from "react-hook-form";

export default function ProductForm() {
  const form = useForm();
  return (
    <FormWrapper form={form} className="gap-8">
      <TextInput fieldLabel="продукт" fieldName="name" />
      <TextInput fieldLabel="коэффициент" fieldName="coefficient" />
      <TextInput fieldLabel="единица" fieldName="unit" />
    </FormWrapper>
  );
}
