"use client";

import ModalConfirm from "@/components/modal/ModalConfirm";
import { PenBoxIcon, Trash2Icon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ActionButton({
  id,
  mainTag,
  handleDelete,
}: {
  id: number;
  mainTag: string;
  handleDelete?: (id: number) => void;
}) {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const handleConfirm = () => {
    setOpen(false);
    handleDelete && handleDelete(id);
  };

  const isDisabled = session?.user?.role !== "ADMIN";
  return (
    <>
      <ModalConfirm
        open={open}
        setOpen={setOpen}
        handleConfirm={handleConfirm}
        message="удалить"
      />
      <div className="flex justify-between">
        <button
          disabled={isDisabled}
          className="cursor-pointer"
          onClick={() => router.push(`/${mainTag}/${id}`)}
        >
          <PenBoxIcon className="h-4 w-4 text-blue-700" />
        </button>
        <button
          disabled={isDisabled}
          className="cursor-pointer"
          onClick={() => !isDisabled && setOpen(true)}
        >
          <Trash2Icon className="h-4 w-4 text-red-700" />
        </button>
      </div>
    </>
  );
}
