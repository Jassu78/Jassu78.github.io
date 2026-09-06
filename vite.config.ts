import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

/** User site: https://jassu78.github.io/ */
export default defineConfig({
  plugins: [react()],
  base: "/",
});
