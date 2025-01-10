// vite.config.mjs
import { defineConfig } from 'vite';

export default defineConfig({
  root: './', // Set the root directory where your index.html resides
  publicDir: 'public',
  server: {
    open: true, // Automatically opens the browser
  },
});