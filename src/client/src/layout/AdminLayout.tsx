import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <div className="flex w-full h-full">
        <header className="w-64 h-full bg-[#333] text-white">
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/admin/sys/dashboard" className="underline">
              Dashboard
            </Link>
            <Link to="/admin/sys/user" className="underline">
              User
            </Link>
          </nav>
        </header>

        <main className="w-0 flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </>
  );
}
