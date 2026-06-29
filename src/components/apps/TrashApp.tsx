"use client";

import { useState } from "react";
import { AppShell } from "@/components/shared/AppShell";
import { FaTrash } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import type { AppWindowProps } from "@/types";

export default function TrashApp(_props: AppWindowProps) {
  const [isEmpty, setIsEmpty] = useState(true);

  const handleEmptyTrash = () => {
    setIsEmpty(true);
    toast.success("Trash emptied");
  };

  return (
    <AppShell title="Trash">
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <FaTrash size={48} className="mb-4 text-gray-500" />
        <h3 className="text-lg font-medium opacity-60">
          {isEmpty ? "Trash is Empty" : "Items in Trash"}
        </h3>
        <p className="mt-2 text-sm opacity-40">
          Items you delete will appear here
        </p>
        {!isEmpty && (
          <Button onClick={handleEmptyTrash} className="mt-4" size="sm">
            Empty Trash
          </Button>
        )}
      </div>
    </AppShell>
  );
}
