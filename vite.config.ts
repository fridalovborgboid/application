import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  root: "src/client",
  resolve: {
    alias: {
      "@client": path.resolve(__dirname, "./src/client"),
      "@server": path.resolve(__dirname, "./src/server"),
      "@shared": path.resolve(__dirname, "./src/shared"), 
    },
  },
  server: {
    port: 3000,
  },
});
