// import { promises as fs } from "fs";
// import path from "path";

import { useCrud } from "@/hooks/use-crud";
import { SysUserDetailType } from "@app/server/src/model";

// import { columns } from "./components/columns";
// import { DataTable } from "./components/data-table";
// import { UserNav } from "./components/user-nav";
// import { taskSchema } from "./data/schema";

// https://github.com/shadcn-ui/ui/blob/main/apps/www/app/(app)/examples/tasks/page.tsx
export default function SysUserPage() {
  const { data } = useCrud<SysUserDetailType[]>({
    baseUrl: "/sys/user",
  });

  return (
    <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      <p className="whitespace-pre-wrap break-words">{JSON.stringify(data)}</p>
      {/* <DataTable data={[]} columns={columns} /> */}
    </div>
  );
}
