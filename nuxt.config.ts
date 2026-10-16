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
    "@nuxt/scripts",
  ],

  css: ["~/assets/main.css"],

  // Infrastructure only: app/plugins/umami.client.ts loads the tracker with
  // the deployment's settings. Without this entry the module bundles Umami
  // Cloud's script at build time and proxies its sends to Umami Cloud, which
  // overrides the self-hosted src
  scripts: {
    registry: {
      umamiAnalytics: { trigger: false, proxy: false, bundle: false },
    },
  },

  ssr: true,

  nitro: {
    prerender: {
      routes: ["/version"],
      crawlLinks: false,
    },
  },

  runtimeConfig: {
    // Umami, served to the client by server/api/analytics.get.ts. Set only by
    // the production deployment (NUXT_UMAMI_WEBSITE_ID, NUXT_UMAMI_DOMAINS as
    // a JSON array, NUXT_UMAMI_SRC); left empty, no tracker loads
    umami: {
      websiteId: "",
      domains: [] as string[],
      src: "",
    },
    // Prometheus scrapes this port in-cluster; the ingress only routes 3000.
    // Override with NUXT_METRICS_PORT
    metricsPort: 9090,
    public: {
      imageTag: "",
    },
  },

  vite: {
    optimizeDeps: {
      include: ["valibot"],
    },
  },
})
