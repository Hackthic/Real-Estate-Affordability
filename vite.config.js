import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import compression from "vite-plugin-compression";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), compression()],
  build: {
    minify: "esbuild",
    chunkSizeWarningLimit: 1000, // Increases the warning limit for chunk sizes
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor"; // Moves all dependencies into a separate vendor chunk
          }
        },
      },
    },
  },
});
