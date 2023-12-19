import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
      },
    },
    plugins: [vue()],
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          spine: resolve(__dirname, 'spine.html'),
        },
        // output:{
        //   manualChunks:{

        //   }
        // }
      },
    },
  },
});
