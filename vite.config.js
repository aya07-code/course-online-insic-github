import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react(), 
        laravel({
            input: ['resources/js/src/styles/index.scss', 'resources/js/src/main.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js/src',
            '@assets': '/resources/js/public/assets',
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "resources/js/src/styles/styles.scss";`,
                
            },
        },
    },
    server: {
        hmr: {
            overlay: false,
        },
    },
});
