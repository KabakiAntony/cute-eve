import { fileURLToPath, URL } from "url";
/// <reference types="vitest">
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  test:{
    //environment: 'happy-dom',
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  base: process.env.NODE_ENV === 'production' ? '/cute-eve/' : './'
});
