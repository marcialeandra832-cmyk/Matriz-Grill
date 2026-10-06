import {defineConfig} from 'vite';

// Site estático: o index.html é a página inteira e tudo em /public vai junto como está.
export default defineConfig({
  build: {outDir: 'dist', assetsInlineLimit: 0},
});
