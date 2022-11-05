import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import pages from "vite-plugin-pages";
import svgLoader from "vite-svg-loader";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    vue(),
    pages(),
    svgLoader(),
    vueI18n({
      include: resolve(__dirname, "./src/locales/**"),
    }),
  ],
});
