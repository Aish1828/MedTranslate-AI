import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],

    server: {
      proxy: {
        "/api/resend": {
          target: "https://api.resend.com",
          changeOrigin: true,

          rewrite: (path) =>
            path.replace(/^\/api\/resend/, ""),

          headers: {
            Authorization: `Bearer ${env.RESEND_API_KEY}`,
          },
        },
      },
    },
  };
});