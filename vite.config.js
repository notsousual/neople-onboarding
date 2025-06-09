import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import netlify from '@netlify/vite-plugin';

export default defineConfig({
  plugins: [react(), netlify(), svgr()],
});
