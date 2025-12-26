import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectInput({
  options,
  fieldName,
  fieldLabel,
  placeholder,
  disabled = false,
  clasNameSelect,
  onValueChange,
}: {
  options: { value: string; label: string }[];
  fieldName: string;
  fieldLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  clasNameSelect?: string;
  onValueChange?: (value: string) => void;
}) {
  const { control } = useFormContext();
  return (
    <FormField
      control={control}
      name={fieldName}
      render={({ field, fieldState }) => (
        <FormItem className="grid-cols-1 gap-4">
          {fieldLabel && <FormLabel>{fieldLabel}</FormLabel>}
          <Select
            key={field.value ?? "empty"}
            onValueChange={(value) => {
              field.onChange(value);
              onValueChange?.(value);
            }}
            value={field.value}
            disabled={disabled}
          >
            <FormControl className={cn(clasNameSelect, "w-full")}>
              <SelectTrigger
                data-placeholder=""
                className={cn(
                  fieldLabel
                    ? "w-full"
                    : "[&_svg]:hidden h-6! border-none bg-transparent shadow-none"
                )}
              >
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectGroup>
                {options.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FormMessage>{fieldState?.error?.message}</FormMessage>
        </FormItem>
      )}
    />
  );
}
