export default class SnapshotService {
  constructor (axios, _isDev) {
    this.axios = axios
  }

  get baseUrl() {
    return 'https://hub.snapshot.page/api'
  }
  
  get spaceName() {
    return 'jamm'
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

  getOverview() {
    return this.fetch(`${this.baseUrl}/spaces/${this.spaceName}`)
  }

  async getAllProposals() {
    return await this.fetch(`${this.baseUrl}/${this.spaceName}/proposals`) || {}
  }
}
