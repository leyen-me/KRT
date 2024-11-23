import { Tool } from "@/components/tool";
import { Card } from "@/components/ui/card";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster"

export default function Layout() {
  const location = useLocation();
  const shouldHideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  const navList = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "About",
      path: "/About",
    },
    {
      name: "Dashboard",
      path: "/admin/sys/dashboard",
    },
  ];

  return (
    <>
      {!shouldHideHeader && (
        <header>
          <Card className="h-14 px-8 absolute flex items-center bottom-4 left-1/2 -translate-x-1/2">
            <ul className="flex items-center gap-8">
              {navList.map((navItem) => {
                return (
                  <li key={navItem.path}>
                    <NavLink
                      end
                      className={({ isActive }) =>
                        isActive ? "underline" : ""
                      }
                      to={navItem.path}
                    >
                      {navItem.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </Card>
        </header>
      )}

      <Tool />
      <Outlet />
      <Toaster />
    </>
  );
}
