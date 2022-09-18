import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true,
        modifyVars: { //在这里进行主题的修改，参考官方配置属性
          '@layout-header-background': '#fff',
          '@menu-item-active-border-width': '0px',
          '@menu-item-height': '3rem',
          '@menu-inline-toplevel-item-height': '3rem',
          '@menu-item-font-size': '0.96rem',
          '@menu-icon-margin-right': '1.2rem',
          '@menu-icon-size': '1.1rem',
          '@menu-item-group-title-color': '#717579',
          '@menu-item-group-height': '50px',
          '@menu-item-boundary-margin': '0px',
          '@menu-item-vertical-margin': '0px',
          '@layout-header-height': '4.3rem',
          '@avatar-border-radius': '0.5rem'
        },
      }
    }
  },
})
