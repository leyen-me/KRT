import { Card } from "@/components/ui/card";
import { Link, Outlet, NavLink } from "react-router-dom";

export default function Layout() {
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
      name: "Product",
      path: "/product",
    },
    {
      name: "Features",
      path: "/features",
    },
    {
      name: "Pricing",
      path: "/pricing",
    },
    {
      name: "Support",
      path: "/support",
    },
  ];

  return (
    <>
      <Card className="h-14 px-8 absolute flex items-center top-4 left-1/2 -translate-x-1/2">
        <ul className="flex items-center gap-8">
          {navList.map((navItem) => {
            return (
              <li key={navItem.path}>
                <NavLink
                  end
                  className={({ isActive }) => (isActive ? "underline" : "")}
                  to={navItem.path}
                >
                  {navItem.name}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Card>

      <Card className="h-14 px-8 absolute flex items-center top-4 right-4 bg-black text-white">
        <NavLink
          end
          className={({ isActive }) => (isActive ? "underline" : "")}
          to={"/admin/dashboard"}
        >
          Admin
        </NavLink>
      </Card>
      <Outlet />
    </>
  );
}
