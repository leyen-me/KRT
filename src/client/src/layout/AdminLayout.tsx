// import { Tool } from "@/components/tool";
// import { Link, Outlet } from "react-router-dom";

// export default function AdminLayout() {
//   return (
//     <>
//       <div className="flex w-full h-full">
//         <nav className="w-64 h-full flex flex-col gap-4 p-4 border-r border-gray-200">
//           <Link to="/admin/sys/dashboard" className="underline">
//             Dashboard
//           </Link>
//           <Link to="/admin/sys/user" className="underline">
//             User
//           </Link>
//           <Link to="/admin/sys/role" className="underline">
//             Role
//           </Link>
//         </nav>
//         <main className="w-0 flex-1 flex flex-col">
//           <header className="w-full h-16 flex items-center justify-between px-8 border-b border-gray-200">
//             menu | 面包削
//             <div className="flex items-center gap-4">
//               <p>搜索 | 头像</p>
//               <Tool relative />
//             </div>
//           </header>
//           <div className="w-full p-8 h-0 flex-1">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
