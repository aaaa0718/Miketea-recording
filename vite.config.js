import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: '/Miketea-recording/',
  plugins: [react(), tailwindcss()],
  build: { outDir: 'dist', target: 'es2022' },
});
