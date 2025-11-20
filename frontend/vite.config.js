import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// Assuming you are using the new Tailwind Vite plugin (v4)
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // 👈 ADD THIS, or your CSS won't work
  ],
  // Remove the 'define' block to avoid breaking environment variables
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000", // This only helps you locally
        changeOrigin: true,
      },
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
  base: process.env.NODE_ENV === "production" ? "/" : "/",
});
