import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
      htmlAttrs: {
          lang: 'en'
      },
      title: 'Flowbite Test',
      lang: 'en',
      link: [
          { rel: "stylesheet", href: "https://unpkg.com/flowbite@1.4.5/dist/flowbite.min.css" },
      ],
      script: [
          { src: 'https://unpkg.com/flowbite@1.4.5/dist/flowbite.js' },
      ]
  },
  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.css'
  ],
  build: {
    postcss: {
      postcssOptions: require('./postcss.config.js'),
    },
  },
  buildModules: [
      '@pinia/nuxt',
  ],
  // ...
})