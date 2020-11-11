import { Plugin } from '@nuxt/types'
import EtherscanService from '~/services/EtherscanService'
import OutpostService from '~/services/OutpostService'
import SnapshotService from '~/services/SnapshotService'
import TokenService from '~/services/TokenService'

interface InterfaceTemplate {
  $etherscanService: EtherscanService
  $outpostService: OutpostService
  $snapshotService: SnapshotService
  $tokenService: TokenService
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
  const snapshotService = new SnapshotService(
    app.$axios
  )
  inject('snapshotService', snapshotService)
  const tokenService = new TokenService(
    app.$axios
  )
  inject('tokenService', tokenService)
}

export default services
