import { Outlet, useLocation } from "react-router-dom";

import { AppSidebar } from "@/components/app-sidebar";
import { Tool } from "@/components/tool";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { t } from "@app/i18n";

export default function AdminLayout() {
  const location = useLocation();
  let title = "";
  switch (location.pathname) {
    case "/admin/sys/dashboard":
      title = "pages.common.nav.dashboard";
      break;
    case "/admin/sys/user":
      title = "pages.common.nav.user";
      break;
    case "/admin/sys/role":
      title = "pages.common.nav.role";
      break;
    case "/admin/sys/translation":
      title = "pages.common.nav.translation";
      break;
    case "/admin/sys/dict":
      title = "pages.common.nav.dict";
      break;
    default:
      break;
  }

  return (
    <>
      <SidebarProvider className="w-full overflow-x-hidden">
        <AppSidebar />
        <SidebarInset className="w-0">
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="w-full flex items-center justify-between px-4">
              <div className="flex items-center justify-between gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>
                        {t("pages.common.nav.application")}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{t(title)}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <Tool relative />
            </div>
          </header>

          {/* todo mb */}
          <div className="flex flex-1 h-0 flex-col p-4 overflow-auto">
            <Outlet />
          </div>

          <div className="h-0"></div>
        </SidebarInset>
      </SidebarProvider>

      <Toaster />
    </>
  );
}
