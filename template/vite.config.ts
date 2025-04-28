import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/",
    server: {
      strictPort: true,
      host: true,
      port: parseInt(env.VITE_PORT) || 3000,
      allowedHosts: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
      allowedHosts: true,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
