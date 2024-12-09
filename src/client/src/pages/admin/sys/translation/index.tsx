import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function SysTranslationPage() {
  return (
    <DataTable columns={columns} />
  );
}
