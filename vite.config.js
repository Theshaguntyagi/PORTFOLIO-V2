import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    // Fixes "Missing source maps for large first-party JavaScript" (Best
    // Practices audit). 'hidden' generates real .map files for stack-trace
    // tools but does NOT add a //# sourceMappingURL comment to the shipped
    // JS, so browsers never fetch them during normal page loads — zero
    // added network weight for visitors, full debuggability when needed.
    sourcemap: 'hidden',
    // Fixes the "Legacy JavaScript" audit (~11 KiB of unnecessary
    // transpiled/polyfilled syntax). Vite's default target is conservative;
    // pinning to a modern-but-safe baseline (covers all browsers with
    // meaningful usage share as of 2026) avoids shipping ES5-style
    // transforms this site's actual audience never needed.
    target: 'es2020',
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
