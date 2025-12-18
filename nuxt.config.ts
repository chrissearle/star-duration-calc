// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  future: {
    compatibilityVersion: 4,
  },
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },

  modules: [
    "@nuxt/icon",
    "@nuxt/ui",
    "@nuxt/eslint",
    "@pinia/nuxt",
  ],

  css: ["~/assets/main.css"],

  ssr: true,

  nitro: {
    prerender: {
      routes: ['/version'],
      crawlLinks: false,
    },
  },

  runtimeConfig: {
    public: {
      imageTag: ''
    },
  },
})
