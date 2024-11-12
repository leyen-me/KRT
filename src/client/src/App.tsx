import { BrowserRouter, Routes, Route } from "react-router-dom";

import { getLocalInfo, LocalInfo } from "@common/lang";

import AdminLayout from "./layout/AdminLayout";

import Home from "@/pages/home";
import About from "@/pages/about";
import Features from "@/pages/features";
import Product from "@/pages/product";
import Pricing from "@/pages/pricing";
import Support from "@/pages/support";
import NotFound from "@/pages/error";
import AdminSysUser from "./pages/admin/sys/user";
import Layout from "./layout/Layout";
import { createContext, useContext } from "react";

const AppContext = createContext<LocalInfo | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a Provider");
  }
  return context;
};

function App() {
  const localInfo = getLocalInfo();

  return (
    <AppContext.Provider value={localInfo}>
      <BrowserRouter
        basename={localInfo.baseName}
        future={{ v7_startTransition: true }}
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/product" element={<Product />} />
            <Route path="/features" element={<Features />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/support" element={<Support />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="/admin/sys/user" element={<AdminSysUser />} />
            <Route path="*" element={<NotFound />} /> {/* 管理 404 页面 */}
          </Route>
          <Route path="*" element={<NotFound />} /> {/* 默认的 404 页面 */}
        </Routes>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
