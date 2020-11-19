import { createClient } from 'outpost-sdk'

export default class OutpostService {
  constructor (axios, _isDev) {
    this.axios = axios
    this.client = createClient()
    this.posts = [] // todo: put this into the store
  }

  get link() {
    return 'https://outpost-protocol.com/jamm'
  }

  articleLink(id) {
    return `https://outpost-protocol.com/jamm/post/${id}`
  }

  // get all JAMM posts, in timestamp order
  async getSortedPosts() {
    const postArray = await this.client.getPosts({
      slug: "jamm"
    })
    return postArray.sort((a, b) => b.timestamp - a.timestamp)
  }

  async getPostPreview(txId) {
    return await this.client.getPostPreview({
      txId
    })
  }
}
