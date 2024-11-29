import { DataTable } from "./components/data-table";
import { columns } from "./components/columns";

// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/tasks/page.tsx
export default function SysUserPage() {
  return (
    <div className="h-full flex-1 flex-col space-y-6 p-2 md:flex xl:p-8 xl:space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>

      <DataTable columns={columns} />
    </div>
  );
}
