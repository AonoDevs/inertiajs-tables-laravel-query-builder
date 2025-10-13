import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import tailwindcss from '@tailwindcss/vite';
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        laravel([
            "resources/css/app.css",
            "resources/js/app.js",
        ]),
        tailwindcss(),
        vue({
            template: {
                transformAssetUrls: {
                    base: null,
                    includeAbsolute: false,
                },
            },
        }),
    ]
});
