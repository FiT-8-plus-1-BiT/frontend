import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // `src`를 절대 경로로 설정
      "@": path.resolve(__dirname, "src"), // 이제 @를 src로 설정
    },
  },
});