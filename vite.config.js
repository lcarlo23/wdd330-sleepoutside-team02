//vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  // Ensure the base matches your GitHub repo name
  base: "/wdd330-sleepoutside-team02/",

  // 1. Vite uses 'src' as the root for finding index.html and assets
  root: "src/",

  build: {
    // 2. Output to '../docs' relative to the 'src' root.
    // This places the final build files directly in the 'docs' folder for GH Pages.
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // 3. Since 'root' is 'src/', Vite is already looking inside that folder.
        // We resolve paths relative to the current file (__dirname) to be safe.
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
