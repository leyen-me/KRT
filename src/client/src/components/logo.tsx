import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div className="absolute left-4 top-4 xl:left-8 xl:top-8">
      <Link className="flex items-center gap-2" to="/">
        <img src="/vite.svg" alt="logo" className="w-8 h-8" />
        <span className="text-xl font-bold">{import.meta.env.VITE_APP_NAME}</span>
      </Link>
    </div>
  );
}
