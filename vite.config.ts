import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        cors: true,
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
        rollupOptions: {
            input: 'src/main.tsx',
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'main.[ext]',
                format: 'es',
            },
        },
    },
})
