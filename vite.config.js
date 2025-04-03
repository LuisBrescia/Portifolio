import { defineConfig } from "vite";
import autoprefixer from "autoprefixer";

export default defineConfig({
  base: "/",
  optimizeDeps: {
    include: ["jquery"],
  },
  css: {
    postcss: {
      plugins: [autoprefixer({})],
    },
  },
});
