import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

export default function SysUserPage() {
  return (
    <DataTable columns={columns} />
  );
}
