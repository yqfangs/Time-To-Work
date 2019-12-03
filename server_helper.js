'user strict'

const log = console.log


const server_helper = {

  validate_avail: function(newAvail, hours) {
    let filtered = null
    try {
      filtered = newAvail.filter((int, i) => {
        if (!int) {
          newAvail[i] = {}
          return true
        }
        else if (int.start >= hours.start && int.end <= hours.end && int.start < int.end && int.duration == int.end-int.start) {
          return true
        }
        else {
          return false
        }
      })
    } catch(err) {
      log("err", err)
      return false
    }

    return filtered.length == 7
  },

  // newShifts look like:
  /*
    [{timeint}, {timeint}, {timeint}, ...]
  */
  validate_shifts: function(newShifts, hours) {
    let filtered = null
    try {
      filtered = newShifts.filter((int, i) => {

        if (!int) {
          newShifts[i] = {}
          return true
        }
        else if (int.start >= hours.start && int.end <= hours.end && int.start < int.end && int.duration == int.end-int.start) {
          return true
        }
        else {
          return false
        }
      })
    } catch(err) {
      log(err)
      return false
    }

    return filtered.length == 7

  }

}


module.exports = {server_helper}
