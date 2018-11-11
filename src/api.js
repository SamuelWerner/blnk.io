/* eslint-disable no-undef */
import axios from 'axios'
var client

console.log(process.env.NODE_ENV + '+++++++++++')
if (process.env.NODE_ENV === 'development') {
  client = axios.create({
    baseURL: 'http://localhost:8081',
    json: true
  })
} else {
  client = axios.create({
    baseURL: 'https://blnk-io.herokuapp.com/',
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
  },
  updateDoc (id, data) {
    return this.execute('put', `/docs/${id}`, data)
  },
  setEnvDB (env) {
    envdb = env
  }
}
