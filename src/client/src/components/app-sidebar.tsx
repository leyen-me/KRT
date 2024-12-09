import * as React from "react";
import {
  BookOpen,
  Bot,
  Command,
  Frame,
  LifeBuoy,
  Map,
  PieChart,
  Send,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavProjects } from "@/components/nav-projects";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "pages.common.nav.playground",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "pages.common.nav.dashboard",
          url: "/admin/sys/dashboard",
        },
      ],
    },
    {
      title: "pages.common.nav.system",
      url: "#",
      icon: Settings2,
      isActive: true,
      items: [
        {
          title: "pages.common.nav.user",
          url: "/admin/sys/user",
        },
        {
          title: "pages.common.nav.role",
          url: "/admin/sys/role",
        },
        {
          title: "pages.common.nav.translation",
          url: "/admin/sys/translation",
        },
        {
          title: "pages.common.nav.dict",
          url: "/admin/sys/dict",
        },
      ],
    },
    {
      title: "pages.common.nav.models",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "pages.common.nav.genesis",
          url: "#",
        },
        {
          title: "pages.common.nav.explorer",
          url: "#",
        },
        {
          title: "pages.common.nav.quantum",
          url: "#",
        },
      ],
    },
    {
      title: "pages.common.nav.documentation",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "pages.common.nav.introduction",
          url: "#",
        },
        {
          title: "pages.common.nav.get_started",
          url: "#",
        },
        {
          title: "pages.common.nav.tutorials",
          url: "#",
        },
        {
          title: "pages.common.nav.changelog",
          url: "#",
        },
      ],
    },
    {
      title: "pages.common.nav.settings",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "pages.common.nav.general",
          url: "#",
        },
        {
          title: "pages.common.nav.team",
          url: "#",
        },
        {
          title: "pages.common.nav.billing",
          url: "#",
        },
        {
          title: "pages.common.nav.limits",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "pages.common.nav.support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "pages.common.nav.feedback",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "pages.common.nav.projects.design_engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "pages.common.nav.projects.sales_marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "pages.common.nav.projects.travel",
      url: "#",
      icon: Map,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">KRT</span>
                  <span className="truncate text-xs">Koa react</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
