import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/PORTFOLIO-V2/",
  build: {
    rollupOptions: {
      output: {
        // Split big libraries into separate, long-cached vendor chunks.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('firebase') || id.includes('@firebase')) return 'vendor-firebase';
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion';
          if (id.includes('react-router') || id.includes('react-dom') || id.includes('/react/')) return 'vendor-react';
          return undefined;
        },
      },
    },
  },
})
