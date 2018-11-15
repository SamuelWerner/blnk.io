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
  }
}
