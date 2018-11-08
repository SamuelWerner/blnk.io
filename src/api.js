import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8081/',
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
      console.log('i am here' + req.data)
      return req.data
    })
  },
  getPosts () {
    console.log('#################2')
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