export default defineNuxtConfig({
    css: [
        '@/assets/css/main.css'
    ],
    buildModules: [
        '@nuxtjs/tailwindcss'
    ],
    devtools: {enabled: true},
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    }
})