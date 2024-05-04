import { defineConfig } from "vite";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    dts({
      insertTypesEntry: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "PrettyModuleClassnames",
      fileName: (format) => (format === "es" ? `index.esm.mjs` : `index.cjs`),
    },
    rollupOptions: {
      external: ["crypto"],
      output: [
        {
          format: "es",
          dir: "dist",
          entryFileNames: "index.esm.mjs",
        },
        {
          format: "cjs",
          dir: "dist",
          entryFileNames: "index.cjs",
          exports: "auto",
        },
      ],
    },
  },
});
