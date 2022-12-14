import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          //在这里进行主题的修改，参考官方配置属性
          "@layout-header-background": "transparent",
          "@layout-body-background": "transparent",
          "@layout-header-height": "72px",
          "@link-color": "#000",
          "@link-hover-color": "#696969",
          "@link-active-color": "#696969",
          "@popover-padding-horizontal": 0,
          "@form-item-margin-bottom": "15px",
          "@layout-footer-padding": "24px 0px",
          "@tabs-hover-color": "#000",
          "@tabs-highlight-color": "#000",
          "@tabs-ink-bar-color": "#000",
          "@primary-color": "#8f95fb",
          "@border-radius-base": "0.375rem",
        },
      },
    },
  },
});
