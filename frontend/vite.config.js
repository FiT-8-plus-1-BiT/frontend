// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  base: '/', // :white_check_mark: 이거 추가! (S3 정적 호스팅의 루트 경로 기준)
  server: {
    proxy: {
      '/api': {
        target: 'https://fit-conference.shop',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [react()],
  define: {
    global: 'window', // 브라우저에서 global 변수를 빈 객체로 설정
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src'),
    },
  },
});
