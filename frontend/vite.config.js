// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  define: {
    global: {}, // sockjs-client 에러 방지
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://fit-conf.shop',
        changeOrigin: true,
        secure: false,
        ws: true // WebSocket 프록시 활성화
      },
      '/ws': {  // WebSocket 경로 추가
        target: 'https://fit-conf.shop',
        changeOrigin: true,
        secure: false,
        ws: true
      }
    }
  }
});
