"use client";
import TextInput from "@/components/input/TextInput";
import { FormWrapper } from "@/components/wrapper/FormWrapper";
import { useForm } from "react-hook-form";

export default function CardForm() {
  const form = useForm();
  return (
    <FormWrapper form={form}>
      <TextInput fieldName="card" />
    </FormWrapper>
  );
}
