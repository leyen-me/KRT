import { Link, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <>
      <header>
        <nav>
          <Link to="/admin/sys/user" className="underline">User</Link>
        </nav>
      </header>
      
      <Outlet />
    </>
  );
}
