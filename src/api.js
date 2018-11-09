import axios from 'axios'

const client = axios.create({
  baseURL: 'https://blnk-io.herokuapp.com/',
  json: true
})

export default {
  async execute (method, resource, data) {
    console.log(method + '  ' + resource + '  ' + data)
    return client({
      method,
      url: resource,
      data
    }).then(req => {
      return req.data
    })
  },
  getPosts () {
    return this.execute('get', '/posts')
  },
  getPost (id) {
    return this.execute('get', `/posts/${id}`)
  },
  createPost (data) {
    return this.execute('post', '/posts', data)
  },
  updatePost (id, data) {
    return this.execute('put', `/posts/${id}`, data)
  },
  deletePost (id) {
    return this.execute('delete', `/posts/${id}`)
  }
}
