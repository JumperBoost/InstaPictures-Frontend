// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: "Insta'Pictures"
    }
  },
  routeRules: {
    '/api/**': {redirect: 'https://instapictures-api.jumperboost.fr/**'}
  },
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss']
})
