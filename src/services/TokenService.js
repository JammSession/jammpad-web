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
  

  async fetch (url) {
    let res = {}
    try {
      const { data } = await this.axios.get(url, {})
      res = data
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in Snapshot fetch: ', res.error) }
    return res
  }

  async getTokenInfo() {
    return await this.fetch(`${this.coingeckoApi}/simple/price?ids=flynnjamm&vs_currencies=usd&include_market_cap=true&include_24hr_vol=false&include_24hr_change=false&include_last_updated_at=false`)
  }
}
