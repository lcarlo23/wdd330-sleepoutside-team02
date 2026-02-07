//vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/wdd330-sleepoutside-team02/",
  // 1. Vite will now look inside 'src' for your files
  root: "src/",

  // 2. Explicitly tell Vite that your static assets are in 'src/public'
  // Files here will be served at the root '/' (e.g., /images/banner.jpg)
  publicDir: "public",

  build: {
    outDir: "../docs", // 3. Output to 'docs' for GitHub Pages
    emptyOutDir: true,
    rollupOptions: {
      input: {
        // Only list HTML entry points here
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
        listing: resolve(__dirname, "src/product_listing/index.html"),
      },
    },
  },
});
