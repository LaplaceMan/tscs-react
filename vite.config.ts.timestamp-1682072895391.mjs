// vite.config.ts
import { defineConfig } from "file:///D:/project/TSCS/tscs-react/node_modules/vite/dist/node/index.js";
import react from "file:///D:/project/TSCS/tscs-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: { "process.env": {} },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {
          "@body-background": "#0f0a19",
          "@component-background": "#1b1524",
          "@primary-color": "#00BEA1",
          "@font-family": "Consolas, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji",
          "@layout-body-background": "@body-background",
          "@layout-header-height": "75px",
          "@link-color": "#fff",
          "@popover-padding-horizontal": 0,
          "@label-color": "#fff",
          "@form-item-label-font-size": "16px",
          "@label-required-color": "#fff",
          "@form-warning-input-bg": "@primary-color",
          "@table-bg": "transparent",
          "@table-row-hover-bg": "#322d3a",
          "@table-header-bg": "transparent",
          "@table-footer-bg": "transparent",
          "@table-border-color": "@body-background",
          "@table-font-size": "16px",
          "@tabs-hover-color": "#fff",
          "@tabs-ink-bar-color": "transparent",
          "@modal-border-radius": "0.75rem",
          "@zindex-affix": 1e4,
          "@modal-content-bg": "#ffffff",
          "@modal-header-bg": "@modal-content-bg",
          "@input-addon-bg": "transparent",
          "@picker-basic-cell-hover-color": "@body-background"
        }
      }
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxwcm9qZWN0XFxcXFRTQ1NcXFxcdHNjcy1yZWFjdFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxccHJvamVjdFxcXFxUU0NTXFxcXHRzY3MtcmVhY3RcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L3Byb2plY3QvVFNDUy90c2NzLXJlYWN0L3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZWFjdCgpXSxcbiAgZGVmaW5lOiB7IFwicHJvY2Vzcy5lbnZcIjoge30gfSxcbiAgY3NzOiB7XG4gICAgcHJlcHJvY2Vzc29yT3B0aW9uczoge1xuICAgICAgbGVzczoge1xuICAgICAgICBqYXZhc2NyaXB0RW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgbW9kaWZ5VmFyczoge1xuICAgICAgICAgIC8vXHU1NzI4XHU4RkQ5XHU5MUNDXHU4RkRCXHU4ODRDXHU0RTNCXHU5ODk4XHU3Njg0XHU0RkVFXHU2NTM5XHVGRjBDXHU1M0MyXHU4MDAzXHU1Qjk4XHU2NUI5XHU5MTREXHU3RjZFXHU1QzVFXHU2MDI3XG4gICAgICAgICAgLy9cdTUxNjhcdTVDNDBcbiAgICAgICAgICBcIkBib2R5LWJhY2tncm91bmRcIjogXCIjMGYwYTE5XCIsXG4gICAgICAgICAgXCJAY29tcG9uZW50LWJhY2tncm91bmRcIjogXCIjMWIxNTI0XCIsXG4gICAgICAgICAgXCJAcHJpbWFyeS1jb2xvclwiOiBcIiMwMEJFQTFcIixcbiAgICAgICAgICBcIkBmb250LWZhbWlseVwiOlxuICAgICAgICAgICAgXCJDb25zb2xhcywgLWFwcGxlLXN5c3RlbSwgQmxpbmtNYWNTeXN0ZW1Gb250LCBTZWdvZSBVSSwgUm9ib3RvLCBIZWx2ZXRpY2EgTmV1ZSwgQXJpYWwsIE5vdG8gU2Fucywgc2Fucy1zZXJpZiwgQXBwbGUgQ29sb3IgRW1vamksIFNlZ29lIFVJIEVtb2ppLCBTZWdvZSBVSSBTeW1ib2wsIE5vdG8gQ29sb3IgRW1vamlcIixcbiAgICAgICAgICAvL2xheW91dFxuICAgICAgICAgIFwiQGxheW91dC1ib2R5LWJhY2tncm91bmRcIjogXCJAYm9keS1iYWNrZ3JvdW5kXCIsXG4gICAgICAgICAgXCJAbGF5b3V0LWhlYWRlci1oZWlnaHRcIjogXCI3NXB4XCIsXG4gICAgICAgICAgLy9saW5rXG4gICAgICAgICAgXCJAbGluay1jb2xvclwiOiBcIiNmZmZcIixcbiAgICAgICAgICAvL3BvcG92ZXJcbiAgICAgICAgICBcIkBwb3BvdmVyLXBhZGRpbmctaG9yaXpvbnRhbFwiOiAwLFxuICAgICAgICAgIC8vZm9ybVxuICAgICAgICAgIFwiQGxhYmVsLWNvbG9yXCI6IFwiI2ZmZlwiLFxuICAgICAgICAgIFwiQGZvcm0taXRlbS1sYWJlbC1mb250LXNpemVcIjogXCIxNnB4XCIsXG4gICAgICAgICAgXCJAbGFiZWwtcmVxdWlyZWQtY29sb3JcIjogXCIjZmZmXCIsXG4gICAgICAgICAgXCJAZm9ybS13YXJuaW5nLWlucHV0LWJnXCI6IFwiQHByaW1hcnktY29sb3JcIixcbiAgICAgICAgICAvL3RhYmxlXG4gICAgICAgICAgXCJAdGFibGUtYmdcIjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgIFwiQHRhYmxlLXJvdy1ob3Zlci1iZ1wiOiBcIiMzMjJkM2FcIixcbiAgICAgICAgICBcIkB0YWJsZS1oZWFkZXItYmdcIjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgIFwiQHRhYmxlLWZvb3Rlci1iZ1wiOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgXCJAdGFibGUtYm9yZGVyLWNvbG9yXCI6IFwiQGJvZHktYmFja2dyb3VuZFwiLFxuICAgICAgICAgIFwiQHRhYmxlLWZvbnQtc2l6ZVwiOiBcIjE2cHhcIixcbiAgICAgICAgICAvL3RhYnNcbiAgICAgICAgICBcIkB0YWJzLWhvdmVyLWNvbG9yXCI6IFwiI2ZmZlwiLFxuICAgICAgICAgIFwiQHRhYnMtaW5rLWJhci1jb2xvclwiOiBcInRyYW5zcGFyZW50XCIsXG4gICAgICAgICAgLy9tb2RhbFxuICAgICAgICAgIFwiQG1vZGFsLWJvcmRlci1yYWRpdXNcIjogXCIwLjc1cmVtXCIsXG4gICAgICAgICAgXCJAemluZGV4LWFmZml4XCI6IDEwMDAwLFxuICAgICAgICAgIFwiQG1vZGFsLWNvbnRlbnQtYmdcIjogXCIjZmZmZmZmXCIsXG4gICAgICAgICAgXCJAbW9kYWwtaGVhZGVyLWJnXCI6IFwiQG1vZGFsLWNvbnRlbnQtYmdcIixcbiAgICAgICAgICAvL0lucHV0XG4gICAgICAgICAgXCJAaW5wdXQtYWRkb24tYmdcIjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICAgIC8vRGF0YXBpY2tlclxuICAgICAgICAgIFwiQHBpY2tlci1iYXNpYy1jZWxsLWhvdmVyLWNvbG9yXCI6IFwiQGJvZHktYmFja2dyb3VuZFwiLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXdRLFNBQVMsb0JBQW9CO0FBQ3JTLE9BQU8sV0FBVztBQUdsQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxDQUFDO0FBQUEsRUFDakIsUUFBUSxFQUFFLGVBQWUsQ0FBQyxFQUFFO0FBQUEsRUFDNUIsS0FBSztBQUFBLElBQ0gscUJBQXFCO0FBQUEsTUFDbkIsTUFBTTtBQUFBLFFBQ0osbUJBQW1CO0FBQUEsUUFDbkIsWUFBWTtBQUFBLFVBR1Ysb0JBQW9CO0FBQUEsVUFDcEIseUJBQXlCO0FBQUEsVUFDekIsa0JBQWtCO0FBQUEsVUFDbEIsZ0JBQ0U7QUFBQSxVQUVGLDJCQUEyQjtBQUFBLFVBQzNCLHlCQUF5QjtBQUFBLFVBRXpCLGVBQWU7QUFBQSxVQUVmLCtCQUErQjtBQUFBLFVBRS9CLGdCQUFnQjtBQUFBLFVBQ2hCLDhCQUE4QjtBQUFBLFVBQzlCLHlCQUF5QjtBQUFBLFVBQ3pCLDBCQUEwQjtBQUFBLFVBRTFCLGFBQWE7QUFBQSxVQUNiLHVCQUF1QjtBQUFBLFVBQ3ZCLG9CQUFvQjtBQUFBLFVBQ3BCLG9CQUFvQjtBQUFBLFVBQ3BCLHVCQUF1QjtBQUFBLFVBQ3ZCLG9CQUFvQjtBQUFBLFVBRXBCLHFCQUFxQjtBQUFBLFVBQ3JCLHVCQUF1QjtBQUFBLFVBRXZCLHdCQUF3QjtBQUFBLFVBQ3hCLGlCQUFpQjtBQUFBLFVBQ2pCLHFCQUFxQjtBQUFBLFVBQ3JCLG9CQUFvQjtBQUFBLFVBRXBCLG1CQUFtQjtBQUFBLFVBRW5CLGtDQUFrQztBQUFBLFFBQ3BDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
