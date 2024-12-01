import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Table } from "@tanstack/react-table";
import { useContext } from "react";
import { UserEditContext } from "./data-table";
import { MODEL_CREATE_FLAG_ID } from "@/constants";

type DataTableNewProps<TData> = {
  table: Table<TData>;
};

export function DataTableNew<TData>({ table }: DataTableNewProps<TData>) {
  const { setId } = useContext(UserEditContext);

  return (
    <Button
      variant="outline"
      size="sm"
      className="ml-auto flex"
      onClick={() => setId({ id: MODEL_CREATE_FLAG_ID })}
    >
      <Plus />
      New
    </Button>
  );
}
