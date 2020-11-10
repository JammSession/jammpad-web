export default class EtherscanService {
  constructor (axios, _isDev) {
    this.axios = axios
  }

  baseUrl (networkId) {
    return '' // todo
  }

  async fetch (url) {
    let res = {}
    try {
      const { data } = await this.axios.get(url, {})
      res = data
    } catch (e) {
      console.error(e)
    }
    if (res.error) { return console.error('Error in Etherscan fetch: ', res.error) }
    return res
  }
}
