import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";

export default function TextInput({
  fieldName,
  fieldLabel,
  placeholder,
  disabled = false,
  description,
  clasNameInput,
  type = "text",
  orientation = "horizontal",
}: {
  fieldName: string;
  fieldLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  description?: string;
  clasNameInput?: string;
  type?: string;
  orientation?: "horizontal" | "vertical";
}) {
  const { control } = useFormContext();

  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field }) => (
        <FormItem
          className={cn(
            orientation === "horizontal"
              ? "grid-cols-1 gap-4"
              : "grid-cols-2 items-end gap-2"
          )}
        >
          <FormLabel>{fieldLabel}</FormLabel>
          <FormControl className={cn(clasNameInput, "w-full")}>
            <Input
              placeholder={placeholder}
              {...field}
              value={field.value ?? ""}
              disabled={disabled}
              type={type}
            />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
