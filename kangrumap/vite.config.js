import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy:
      mode === "development"
        ? {
            "/api/hotpepper": {
              target: "https://webservice.recruit.co.jp",
              changeOrigin: true,
              rewrite: (path) =>
                path.replace(/^\/api\/hotpepper/, "/hotpepper"),
              secure: true, 
            },
          }
        : {}, // 배포 환경에서는 프록시를 사용하지 않음
  },
}));
