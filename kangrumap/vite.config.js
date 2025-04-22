import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      "/api/hotpepper": {
        target: "https://webservice.recruit.co.jp",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/hotpepper/, "/hotpepper"),
        secure: true,
      },
    },
    hmr: {
      clientPort: 5174,
      protocol: 'ws',
    },
  },
}));
