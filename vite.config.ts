import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: { "process.env": {} },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          //在这里进行主题的修改，参考官方配置属性
          //全局
          "@body-background": "#0f0a19",
          "@component-background": "#1b1524",
          "@primary-color": "#00BEA1",
          "@font-family":
            "Consolas, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          //layout
          "@layout-body-background": "@body-background",
          "@layout-header-height": "75px",
          //link
          "@link-color": "#fff",
          //popover
          "@popover-padding-horizontal": 0,
          //form
          "@label-color": "#fff",
          "@form-item-label-font-size": "16px",
          "@label-required-color": "#fff",
          "@form-warning-input-bg": "@primary-color",
          //table
          "@table-bg": "transparent",
          "@table-row-hover-bg": "#322d3a",
          "@table-header-bg": "transparent",
          "@table-footer-bg": "transparent",
          "@table-border-color": "@body-background",
          "@table-font-size": "16px",
          //tabs
          "@tabs-hover-color": "#000",
          "@tabs-highlight-color": "#000",
          "@tabs-ink-bar-color": "#000",
          //modal
          "@modal-border-radius": "24px",
          "@zindex-affix": 10000,
          //Input
          "@input-addon-bg": "transparent",
          //Datapicker
          "@picker-basic-cell-hover-color": "@body-background",
        },
      },
    },
  },
});
