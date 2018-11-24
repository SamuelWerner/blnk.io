/* eslint-disable no-undef */
import axios from 'axios'
var client

if (process.env.NODE_ENV === 'development') {
  client = axios.create({
    baseURL: 'http://localhost:8080',
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
  getDocs () {
    return this.execute('get', '/docs')
  },
  getDoc (hash) {
    return this.execute('get', `/docs/${hash}`)
  },
  createDoc (data) {
    return this.execute('post', '/docs', data)
  },
  deleteDoc (hash) {
    return this.execute('delete', `/docs/${hash}`)
  },
  updateDoc (hash, data) {
    return this.execute('put', `/docs/${hash}`, data)
  }
}
