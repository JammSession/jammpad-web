const env = require('dotenv').config()

const SITE_INFO = {
  title: 'JAMM Pad - JAMM tokenized crypto community',
  googleFonts: [
    'Montserrat: 300,500',
    'Source+Code+Pro:200,300,400',
  ]
}

export default {
  env: env.parsed,
  dev: (process.env.NODE_ENV !== 'production'),
  target: 'static',
  head: (() => {
    const head = {
      title: 'JAMM Pad - JAMM tokenized crypto community',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'Are you ready to $JAMM?'
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: '/content-placeholder.png' 
        },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Jamm Pad - JAMM tokenized crypto community' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:description', name: 'twitter:description', content: "Are you ready to $JAMM?" },
        { name: 'twitter:image', content: `https://5fbb1dc1b3cc31a05133137d--confident-borg-262ef1.netlify.app/content-placeholder.png` }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico?v=2' },
        {
          rel: 'stylesheet',
          href:
            'https://fonts.googleapis.com/css?family=Montserrat:600|Roboto|Roboto+Mono&display=swap'
        }
      ]
    }
    head.link = head.link.concat({
      rel: 'stylesheet',
      href: `https://fonts.googleapis.com/css?family=${SITE_INFO.googleFonts.join(
        '|'
      )}&display=swap`
    })
    return head
  })(),
  loading: { color: '#101113' },
  loadingIndicator: {
    name: 'chasing-dots',
    color: '#21CE99',
    background: '#272C32'
  },
  css: [
    'animate.css/animate.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
    '~/assets/styles/main.scss'
    ],
  plugins: [
    { src: '@/plugins/axios' },
    { src: '@/plugins/ethereum.client', ssr: false },
    { src: '@/plugins/localstorage.client', ssr: false },
    { src: '@/plugins/error-handler' },
    { src: '@/plugins/services' },
    { src: '@/plugins/util' },
    { src: '@/plugins/nuxt-client-init.client', ssr: false },
    { src: '@/plugins/fontawesome' },
    { src: '@/plugins/moment' },
    { src: '@/plugins/vue-lazyload.client', ssr: false },
    { src: '@/plugins/v-tooltip.client', ssr: false }
  ],
  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxtjs/device',
    '@nuxtjs/toast',
    '@nuxtjs/google-analytics',
    'vue-scrollto/nuxt',
    ['@nuxtjs/moment', ['ja', 'zh-cn']],
    'cookie-universal-nuxt'
  ],
  build: {
    /*
     ** You can extend webpack config here
     */
    // extend(config, ctx) {
    // }
    transpile: ['vue-nl2br'],
    loaders: {
      vue: {
        transformAssetUrls: {
          img: ['src', 'srcset'],
          source: 'srcset',
          'lazy-image': 'src'
        }
      }
    },
    babel: {
      plugins: [
        ['@babel/plugin-proposal-decorators', { legacy: true }],
        ['@babel/plugin-proposal-class-properties', { loose: true }],
        ['@babel/plugin-transform-modules-commonjs']
      ]
    }
  },
  buildModules: [
      '@nuxtjs/moment',
      ['@nuxt/typescript-build', {
        typeCheck: {
          memoryLimit: 4096,
          workers: 2
        }
      }]
  ],
  srcDir: 'src/',
  // server: {
  //   host: process.env.HOST || '0.0.0.0',
  //   port: process.env.PORT || 3000
  // },
  styleResources: {
    scss: ['~/assets/styles/_variables.scss']
  },
  router: {
    linkActiveClass: 'active-link'
  },
  toast: {
    position: 'top-center',
    duration: 2000,
    fullWidth: true,
    className: 'jammToast__inner',
    containerClass: 'jammToast',
    iconPack: 'fontawesome',
    singleton: true
  },
}
