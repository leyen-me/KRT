import { Route, Routes, Link } from "react-router-dom";
import Home from "@/pages/home";
import About from "@/pages/about";
import NotFound from "@/pages/error";

import { LANG } from "@common/lang";

function App() {
  return (
    <>
      {LANG}
      <div className="flex h-full">
        <nav className="flex-[0.2] h-full bg-black text-white">
          <ul>
            <li className="underline">
              <Link to="/">Home</Link>
            </li>
            <li className="underline">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
        <div className="flex-1 h-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} /> {/* 默认的 404 页面 */}
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
