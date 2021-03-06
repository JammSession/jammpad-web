import { NEXT_AUTH_STEPS } from '~/assets/data/constants'

export const state = () => ({
  ownAddress: '',
  networkId: 1,
  isError: false,
  error: null,
  didStartInit: false,
  finishedInit: false,
  authStoppedAt: '',
  myJammBalance: 0
})

export const mutations = {
  SET_START_INIT (state, flag) {
    state.didStartInit = flag
  },
  FINISH_INIT (state, flag) {
    state.finishedInit = flag
  },
  SET_NEXT_AUTH_STEP (state, step) {
    state.authStoppedAt = step
  },
  SET_OWN_ADDRESS (state, address) {
    state.ownAddress = address
  },
  SET_NETWORK_ID (state, networkId) {
    state.networkId = networkId
  },
  SET_IS_ERROR(state, isError) {
    state.isError = isError
  },
  SET_ERROR_MESSAGE_FOR_DEV(state, error) {
    state.error = error
  },
  SET_OWN_JAMM_BALANCE(state, balance) {
    state.myJammBalance = balance
  }
}


export const actions = {
  nuxtServerInit () {
  },

  async nuxtClientInit ({ state, dispatch, commit }, {force = false}) {
    // prevent from double init
    if (state.didStartInit && !force) return 
    // check for wallet
    if (!this.$ethereumService.hasWallet) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[0])
      await commit('FINISH_INIT', true)
      return 
    }
    // getting web3
    await dispatch('setWeb3')
    if (!state.ownAddress) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[1])
      await commit('FINISH_INIT', true)
      return
    } 
    // finishing startup
    await dispatch('startupFunctions')
    await commit('FINISH_INIT', true)
  },

  async startupFunctions ({ commit, dispatch }, _context) {
    await commit('SET_START_INIT', true)
    await commit('FINISH_INIT', false)
    try {
      await dispatch('setWeb3')
      await dispatch('getMyJammBalance')
      // load more init functions here
    } catch (e) {
      await commit('SET_NEXT_AUTH_STEP', NEXT_AUTH_STEPS[3])
    } finally {
      await commit('FINISH_INIT', true)
    }
  },

  async setWeb3 ({ commit }, _context) {
    try {
      const address = await this.$ethereumService.getCurrentAccountAsync()
      const networkId = await this.$ethereumService.getNetworkIdAsync()
      await commit('SET_OWN_ADDRESS', address)
      await commit('SET_NETWORK_ID', networkId)
    } catch (e) {
      console.error(e)
    }
  },

  async getMyJammBalance({ commit, state }, _context) { 
    try {
      const balance = await this.$tokenService.getTokenValueByAddress(state.ownAddress)
      await commit('SET_OWN_JAMM_BALANCE', balance)
    } catch (e) {
      console.error(e)
    }
  }
}
