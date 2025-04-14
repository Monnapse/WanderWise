import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        destinations: resolve(__dirname, "src/destinations.html"),
        random: resolve(__dirname, "src/random.html"),
        favorites: resolve(__dirname, "src/index.html"),
      },
    },
  },
});
