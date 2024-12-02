import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

type DataTableDeleteProps<TData> = {
  table: Table<TData>;
};

export default function DataTableDelete<TData>({
  table,
}: DataTableDeleteProps<TData>) {
  return (
    <Button variant="destructive" size="sm" className="ml-auto flex">
      <Trash2 />
      Delete
    </Button>
  );
}
