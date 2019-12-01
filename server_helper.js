'user strict'

const { Employee } = require('./db/models/employee')
const { mongoose } = require('./db/mongoose')

const log = console.log


const server_helper = {

  validate_avail: function(newAvail) {
    let filtered = null
    try {
      filtered = newAvail.filter((int) => {
        return int.start >= 0 && int.end <= 24 && int.start < int.end && int.duration == int.end-int.start
      })
    } catch(err) {
      return false
    }

    if (filtered.length == 7) {
      return true
    }
    return false
  }

}

module.exports = {server_helper}
