import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",   // <-- Add this

  plugins: [react()],

  build: {
    outDir: "dist"
  },

  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": {
        target: "https://ae-sprotsbackend.onrender.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
});
