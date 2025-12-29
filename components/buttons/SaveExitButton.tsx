"use client";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function SaveExitButton({
  resetForm,
}: {
  resetForm?: () => void;
}) {
  const router = useRouter();
  const exit = () => router.back();
  return (
    <div className={cn("flex gap-4 w-full justify-end mt-6")}>
      <Button
        type="button"
        variant="ghost"
        className="w-24 cursor-pointer"
        onClick={() => resetForm && resetForm()}
      >
        очистить
      </Button>
      <Button
        type="button"
        variant="destructive"
        className="w-24 cursor-pointer"
        onClick={exit}
      >
        выйти
      </Button>
      <Button type="submit" className="w-24 cursor-pointer">
        сохранить
      </Button>
    </div>
  );
}
