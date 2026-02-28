import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        cors: true,
    },
    base: 'https://think-through.github.io/libro-viajero-de-kate',
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        manifest: true,
        rollupOptions: {
            input: 'src/main.tsx',
            output: {
                format: 'es',
                manualChunks: {
                    vendor_mapbox: ['mapbox-gl'],
                    vendor_swiper: ['swiper'],
                    vendor_react: ['react', 'react-dom'],
                },
            },
        },
    },
})
