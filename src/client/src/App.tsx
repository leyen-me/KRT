import { BrowserRouter, Routes, Route } from "react-router-dom";

import { I18nContext, useI18n } from "@app/i18n";
import { ThemeProvider } from "@app/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import NotFound from "@/pages/error";
import Login from "@/pages/login";
import Register from "@/pages/register";

import Layout from "./layout/Layout";
import Home from "@/pages/home";
import About from "@/pages/about";
import Features from "@/pages/features";
import Product from "@/pages/product";
import Pricing from "@/pages/pricing";
import Support from "@/pages/support";

import AdminLayout from "./layout/AdminLayout";
import { AdminProtectedRoute } from "./layout/AdminProtectedRoute";
import AdminSysUser from "./pages/admin/sys/user";
import AdminSysDashboard from "./pages/admin/sys/dashboard";

const queryClient = new QueryClient();

function App() {
  const { i18nInfo } = useI18n();
  return (
    <ThemeProvider>
      <I18nContext.Provider value={i18nInfo}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter
            basename={i18nInfo.path}
            future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
          >
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/product" element={<Product />} />
                <Route path="/features" element={<Features />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/support" element={<Support />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
              </Route>
              <Route
                path="/admin"
                element={
                  <AdminProtectedRoute>
                    <AdminLayout />
                  </AdminProtectedRoute>
                }
              >
                <Route path="/admin/sys/user" element={<AdminSysUser />} />
                <Route path="/admin/sys/dashboard" element={<AdminSysDashboard />} />
                <Route path="*" element={<NotFound />} /> {/* 管理 404 页面 */}
              </Route>
              <Route path="*" element={<NotFound />} /> {/* 默认的 404 页面 */}
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </I18nContext.Provider>
    </ThemeProvider>
  );
}

export default App;
