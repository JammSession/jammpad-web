import Web3 from 'web3'
import Notify from 'bnc-notify'
import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import { BLOCKNATIVE, INFURA_ID } from '~/assets/data/non_secret_keys.js'

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: INFURA_ID // required
    }
  }
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});


export default class EthereumService {
  constructor (provider, web3, store, options = { dev: false }, app) {
    this.web3 = web3
    this.store = store
    this.options = options
    this.provider = provider
    this.defaultAccount = ''
    this.app = app

    if (process.server) return

    if (window.ethereum && window.ethereum.on) {
      try {
        window.ethereum.on('accountsChanged', (accounts) => {
          console.log(accounts)
          this.store.dispatch('nuxtClientInit', {force: true})
        })
      } catch (e) {
        console.error(`error setting listener: ${e}`)
      }
    }
  }

  get utils () {
    return this.web3.utils
  }

  get eth () {
    return this.web3.eth
  }

  get hasWallet () {
    return this.provider !== null
  }

  get account () {
    return this.defaultAccount || ''
  }

  get cachedProvider () {
    return web3Modal.cachedProvider
  }

  get contractAddresses() {
    return this.store.state.contractAddresses
  }

  async walletUnlocked () {
    if (!this.hasWallet) {
      throw new Error('[Error] There is no Ethereum wallet.')
    }
    const account = await this.getCurrentAccountAsync()
    return !!account
  }

  async unlockWallet() {
    try {
      this.provider = await web3Modal.connect()
      this.web3 = new Web3(this.provider)
      await this.store.dispatch('setWeb3')
      await this.store.dispatch('startupFunctions')
      await this.store.commit('FINISH_INIT', true)
    } catch (e) {
      console.error(`Error unlocking wallet: ${e}`)
    }
  }

  async getCurrentAccountAsync () {
    try {
      if (!this.web3) return ''
      const accounts = await this.web3.eth.getAccounts()
      if (!accounts || !accounts[0]) return ''
      const account = accounts[0].toLowerCase()
      this.options.dev &&
        console.info(`Current account is ${account}.`)
      return account
    } catch (e) {
      console.error(`Error getting account: ${e}`)
    }
  }

  async getSignatureAsync (dataToSign) {
    const address = await this.getCurrentAccountAsync()
    const sig = await this.web3.eth.personal.sign(
      dataToSign,
      address,
      ''
    )
    return sig
  }

  getNetworkIdAsync () {
    return this.web3.eth.net.getId()
  }

  // useful for later
  getERC721Contract (address) {
    return new this.web3.eth.Contract(ERC721Abi, address)
  }

  async getGasPriceInGwei () {
    let gasPriceInGwei = await this.web3.eth.getGasPrice()
    if (gasPriceInGwei < this.web3.utils.toWei('5', 'gwei')) {
      gasPriceInGwei = this.web3.utils.toWei('5', 'gwei')
    }
    return gasPriceInGwei
  }

  getNetworkSlug (netId) {
    switch (netId) {
      case 1:
        return 'mainnet'
      case 3:
        return 'ropsten'
      case 42:
        return 'kovan'
      case 4:
        return 'rinkeby'
      default:
        return ''
    }
  }

  // useful for later
  async approveContract (contractAddress, converterAddress, fromAddress, networkId, callbackAfterSend = () => {}) {
    const notify = Notify({
      dappId: BLOCKNATIVE, // [String] The API key created by step one above
      networkId // [Integer] The Ethereum network ID your Dapp uses.
    })

    const contract = await this.getERC721Contract(contractAddress)
    const gasPriceInGwei = await this.getGasPriceInGwei()
    return contract.methods
      .setApprovalForAll(converterAddress, true)
      .send({
        from: fromAddress,
        gasPrice: gasPriceInGwei,
        gasLimit: 300000
      })
      .on('transactionHash', function (hash) {
        notify.hash(hash)
        callbackAfterSend()
      })
      .on('receipt', function (receipt) {
        console.info(receipt)
      })
  }
}
