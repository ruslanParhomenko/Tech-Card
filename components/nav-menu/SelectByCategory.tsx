import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { RefreshCcw } from "lucide-react";

export const CATEGORY = [
  {
    label: "первое",
    value: "first",
  },
  {
    label: "второе",
    value: "second",
  },
  {
    label: "салат",
    value: "salad",
  },
  {
    label: "десерт",
    value: "dessert",
  },
  {
    label: "суп",
    value: "soup",
  },
  {
    label: "П/Ф",
    value: "pf",
  },
  {
    label: "персонал",
    value: "staff",
  },
  {
    label: "завтрак",
    value: "breakfast",
  },
  {
    label: "гарнир",
    value: "side",
  },
];

export default function SelectByMonthYear({
  options,
  category,
  setCategory,

  isLoading,
}: {
  options: { value: string; label: string }[];
  category: string;
  setCategory: (value: string) => void;

  isLoading?: boolean;
}) {
  const classNameSelect =
    "w-36 h-8! rounded-md  [&>svg]:hidden justify-center bg-border";

  const resetParams = () => {
    setCategory("");
  };
  return (
    <div className="flex items-center justify-between gap-4">
      <Select
        value={category}
        onValueChange={(value) => setCategory(value)}
        disabled={isLoading}
      >
        <SelectTrigger className={cn(classNameSelect)}>
          <SelectValue placeholder="category" />
        </SelectTrigger>
        <SelectContent>
          {options.map((category) => (
            <SelectItem key={category.value} value={category.value}>
              <span className="truncate block w-full">{category.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <button
        onClick={resetParams}
        className="cursor-pointer w-12  px-2 bg-border rounded-md h-8 flex items-center justify-center"
      >
        <RefreshCcw className="w-4 h-4" />
      </button>
    </div>
  );
}
