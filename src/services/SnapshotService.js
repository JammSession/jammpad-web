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
  
  get snapshotLink() {
    return 'https://snapshot.page/#/jamm'
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

  voteLink(id) {
    return `${this.snapshotLink}/proposal/${id}`
  }

  async getAllProposals() {
    const proposals = await this.fetch(`${this.baseUrl}/${this.spaceName}/proposals`) || {}
    return this.cleanAndSort(Object.values(proposals)) // convert obj to array
  }

  cleanAndSort(proposals) {
    const cleaned = proposals.map(proposal => ({
      timestamp: Number(proposal.msg.timestamp) * 1000,
      title: proposal.msg.payload.name,
      body: proposal.msg.payload.body,
      end: proposal.msg.payload.end * 1000,
      start: proposal.msg.payload.start * 1000,
      id: proposal.authorIpfsHash
    }))
    return cleaned.sort((a, b) => b.timestamp - a.timestamp)
  }
}
