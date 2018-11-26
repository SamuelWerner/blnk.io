var crypto = require('crypto')

module.exports = {
  create: {
    fetch: function (req, res, context) {
      try {
        var random = Math.random().toString()
        let hash = crypto.createHash('sha1').update(res.req.title + random).digest('hex')
        context.attributes['hash'] = hash
        context.attributes['body'] = ''
        // manipulate the fetch call
        return context.continue
      } catch (e) {
        console.log(e)
      }
    }
  }
  // list: {
  //   write: {
  //     before: function (req, res, context) {
  //       // modify data before writing list data
  //       return context.continue
  //     },
  //     action: function (req, res, context) {
  //       // change behavior of actually writing the data
  //       return context.continue
  //     },
  //     after: function (req, res, context) {
  //       // set some sort of flag after writing list data
  //       return context.continue
  //     }
  //   }
  // }
}
