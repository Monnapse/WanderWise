import { resolve } from "path";
import { defineConfig } from "vite";
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  root: "src/",
  publicDir: "../public",
  plugins: [commonjs()], // Add the CommonJS plugin
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
