import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite';
import vueDevTools from 'vite-plugin-vue-devtools'
import { createHtmlPlugin } from 'vite-plugin-html';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        vueDevTools(),
        createHtmlPlugin({
            minify: true,
        }),
    ],
    build: {
        target: 'es2015',
        cssCodeSplit: true,
        sourcemap: false,
        minify: 'esbuild',
        assetsInlineLimit: 4096,
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
})
