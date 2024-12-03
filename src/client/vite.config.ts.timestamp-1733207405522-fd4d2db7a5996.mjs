// ../client/vite.config.ts
import path from "path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///C:/Users/67222/Desktop/project/KTR/node_modules/.pnpm/vite@5.4.11_@types+node@22.10.0/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/67222/Desktop/project/KTR/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.2_vite@5.4.11/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tailwindcss from "file:///C:/Users/67222/Desktop/project/KTR/node_modules/.pnpm/tailwindcss@3.4.15/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///C:/Users/67222/Desktop/project/KTR/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.49/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_dirname = "C:\\Users\\67222\\Desktop\\project\\KTR\\src\\client";
var __vite_injected_original_import_meta_url = "file:///C:/Users/67222/Desktop/project/KTR/src/client/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [react()],
  build: {
    outDir: path.resolve(__vite_injected_original_dirname, "../server/dist/client"),
    emptyOutDir: true
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: path.resolve(__vite_injected_original_dirname, "./tailwind.config.js")
        }),
        autoprefixer
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vY2xpZW50L3ZpdGUuY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcNjcyMjJcXFxcRGVza3RvcFxcXFxwcm9qZWN0XFxcXEtUUlxcXFxzcmNcXFxcY2xpZW50XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFw2NzIyMlxcXFxEZXNrdG9wXFxcXHByb2plY3RcXFxcS1RSXFxcXHNyY1xcXFxjbGllbnRcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzLzY3MjIyL0Rlc2t0b3AvcHJvamVjdC9LVFIvc3JjL2NsaWVudC92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCBwYXRoIGZyb20gXCJwYXRoXCI7XG5pbXBvcnQgeyBmaWxlVVJMVG9QYXRoLCBVUkwgfSBmcm9tIFwibm9kZTp1cmxcIjtcblxuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5cbmltcG9ydCB0YWlsd2luZGNzcyBmcm9tIFwidGFpbHdpbmRjc3NcIjtcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSBcImF1dG9wcmVmaXhlclwiO1xuXG4vLyBodHRwczovL3ZpdGUuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgYnVpbGQ6IHtcbiAgICBvdXREaXI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi4vc2VydmVyL2Rpc3QvY2xpZW50XCIpLFxuICAgIGVtcHR5T3V0RGlyOiB0cnVlLFxuICB9LFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL3NyY1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBjc3M6IHtcbiAgICBwb3N0Y3NzOiB7XG4gICAgICBwbHVnaW5zOiBbXG4gICAgICAgIHRhaWx3aW5kY3NzKHtcbiAgICAgICAgICBjb25maWc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi90YWlsd2luZC5jb25maWcuanNcIiksXG4gICAgICAgIH0pLFxuICAgICAgICBhdXRvcHJlZml4ZXIsXG4gICAgICBdLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBeVUsT0FBTyxVQUFVO0FBQzFWLFNBQVMsZUFBZSxXQUFXO0FBRW5DLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUVsQixPQUFPLGlCQUFpQjtBQUN4QixPQUFPLGtCQUFrQjtBQVB6QixJQUFNLG1DQUFtQztBQUF3SyxJQUFNLDJDQUEyQztBQVVsUSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsT0FBTztBQUFBLElBQ0wsUUFBUSxLQUFLLFFBQVEsa0NBQVcsdUJBQXVCO0FBQUEsSUFDdkQsYUFBYTtBQUFBLEVBQ2Y7QUFBQSxFQUNBLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDO0FBQUEsSUFDdEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSCxTQUFTO0FBQUEsTUFDUCxTQUFTO0FBQUEsUUFDUCxZQUFZO0FBQUEsVUFDVixRQUFRLEtBQUssUUFBUSxrQ0FBVyxzQkFBc0I7QUFBQSxRQUN4RCxDQUFDO0FBQUEsUUFDRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
