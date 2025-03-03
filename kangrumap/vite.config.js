import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/hotpepper": {
        target: "https://webservice.recruit.co.jp", // Hot Pepper API URL
        changeOrigin: true, // CORS 우회
        rewrite: (path) => path.replace(/^\/api\/hotpepper/, "/hotpepper"), // URL 재작성
        secure: false, // HTTPS 관련 오류 방지
      },
    },
  },
});
