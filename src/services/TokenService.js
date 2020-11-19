import { ETHERSCAN_API } from "~/assets/data/non_secret_keys"

export default class TokenService {
  constructor (axios, _isDev) {
    this.axios = axios
  }

  get coingeckoApi() {
    return 'https://api.coingecko.com/api/v3'
  }
  
  get etherscanApi() {
    return 'https://hub.snapshot.page/api'
  }
  
  get treasuryLink() {
    return `https://gnosis-safe.io/app/#/safes/${this.treasuryAddress}/transactions`
  }

  get jammContractAddress() {
    return '0x56687cf29ac9751ce2a4e764680b6ad7e668942e'
  }

  get treasuryAddress() {
    return '0xB882e65857266d435a6F6B03a4cd4ea74C92B25e'
  }

  get JammDecimals() {
    return 4
  }

  async fetch (url) {
    let res = {}
    try {
      const { data } = await this.axios.get(url, {})
      res = data
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in TokenService fetch: ', res.error) }
    return res
  }

  async getTokenInfo() {
    return (await this.fetch(`${this.coingeckoApi}/simple/price?ids=flynnjamm&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`) || {}).flynnjamm
  }

  async getTreasuryInfo() {
    const res = (await this.fetch(`https://api.etherscan.io/api?module=account&action=tokentx&address=${this.treasuryAddress}&startblock=0&endblock=99999999&sort=asc&apikey=${ETHERSCAN_API}`)|| {}).result

    return this.cleanAndSortTxs(res)
  }

  async getTreasuryBalance() {
    const balance = (await this.fetch(`https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress=${this.jammContractAddress}&address=${this.treasuryAddress}&tag=latest&apikey=${ETHERSCAN_API}`)).result
    return Number(balance) / 10 ** this.JammDecimals
  }

  cleanAndSortTxs(txArray) {
    const txs = txArray.map(tx => ({
        tokenSymbol: tx.tokenSymbol,
        isOutbound: tx.from === this.treasuryAddress.toLowerCase(),
        value: tx.value / (10**4),
        timeStamp: Number(tx.timeStamp)
      })
    )
    return txs.sort((a,b) => b.timeStamp - a.timeStamp)
  }
}