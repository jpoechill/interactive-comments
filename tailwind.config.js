module.exports = {
    content: [
      './assets/**/*.{vue,js,css}',
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      // './nuxt.config.{js,ts}',
      './src/**/*.html', 
      './node_modules/flowbite/**/*.js',
    ],
    variants: {
      extend: {},
    },
    theme: {
      extend: {},
    },
    plugins: [
      // require('flowbite/plugin')
    ],
  };