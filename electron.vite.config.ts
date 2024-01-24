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
          main: resolve('src/renderer/index.html'),
          spine: resolve('src/renderer/spine.html'),
        },
        // output:{
        //   manualChunks:{

        //   }
        // }
      },
    },
  },
});
