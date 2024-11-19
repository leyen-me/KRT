import { loadEnv } from "vite";
import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { VitePluginNode } from "vite-plugin-node";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd());
  return {
    plugins: [
      ...VitePluginNode({
        adapter: "koa",
        appPath: "./src/index.ts",
        exportName: "app",
        initAppOnBoot: false,
        tsCompiler: "esbuild",
        swcOptions: {
          jsc: {
            target: "es2019",
            parser: {
              syntax: "typescript",
              decorators: true,
            },
            transform: {
              legacyDecorator: true,
              decoratorMetadata: true,
            },
          },
        },
      }),
    ],
    server: {
      port: Number(VITE_PORT),
      host: "0.0.0.0",
    },
    build: {
      outDir: "./dist/server",
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
