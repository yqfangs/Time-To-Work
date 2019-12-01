'user strict'

const { Employee } = require('./db/models/employee')
const { mongoose } = require('./db/mongoose')


const server_helper = {

  validate_avail: function(newAvail) {
    let filtered = null
    try {
      filtered = newAvail.filter((avail) => {
        return avail.start >= 0 && avail.end <= 24 && avail.start < avail.end
      })
    } catch(err) {
      console.log(err)
      return false
    }

    if (filtered.length == 7) {
      return true
    }

    return false
  }

}

module.exports = { server_helper }
