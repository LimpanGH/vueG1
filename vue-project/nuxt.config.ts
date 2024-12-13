// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxtjs/color-mode", "nuxt-snackbar"],
  app: {
    head: {
      title: "SpAIce",
      meta: [
        { name: "description", content: "SpAIce - Space travels and AI" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
      ],
      link: [{ rel: "icon", type: "image/png", href: "/spaice-favicon.png" }],
    },
  },
  snackbar: {
    bottom: true,
    right: true,
    duration: 5000,
  },
  future: {
    compatibilityVersion: 4,
  },
  colorMode: {
    classSuffix: "",
  },
});
