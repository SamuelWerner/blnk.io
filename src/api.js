import axios from 'axios'
var client
if (process.env.dbEnvironment === 'server') {
  client = axios.create({
    baseURL: 'https://blnk-io.herokuapp.com/',
    json: true
  })
} else {
  client = axios.create({
    baseURL: 'http://localhost:8081',
    json: true
  })
}

export default {
  async execute (method, resource, data) {
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
  },
  getDocs () {
    return this.execute('get', '/docs')
  },
  getDoc (id) {
    return this.execute('get', `/docs/${id}`)
  },
  createDoc (data) {
    return this.execute('post', '/docs', data)
  },
  deleteDoc (id) {
    return this.execute('delete', `/docs/${id}`)
  }
}
