import { Plugin } from '@nuxt/types'
import EtherscanService from '~/services/EtherscanService'
import OutpostService from '~/services/OutpostService'

interface InterfaceTemplate {
  $etherscanService: EtherscanService
  $outpostService: OutpostService
}

declare module 'vue/types/vue' {
  interface Vue extends InterfaceTemplate {
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions extends InterfaceTemplate {
  }
}

declare module 'vuex/types/index' {
  interface Store<S> extends InterfaceTemplate {
  }
}

const services: Plugin = ({ app, $moment, store}, inject) => {
  const etherscanService = new EtherscanService(
    app.$axios
  )
  inject('etherscanService', etherscanService)
  const outpostService = new OutpostService(
    app.$axios
  )
  inject('outpostService', outpostService)
}

export default services
