import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function SysTranslationPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-6 p-2 md:flex xl:p-8 xl:space-y-8">
      <DataTable columns={columns} />
    </div>
  );
}
