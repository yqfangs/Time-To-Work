'user strict'


const log = console.log


const server_helper = {

  validate_avail: function(newAvail) {
    let filtered = null
    try {
      filtered = newAvail.filter((int, i) => {
        if (!int) {
          newAvail[i] = {}
          return true
        }
        else if (int.start >= 0 && int.end <= 24 && int.start < int.end && int.duration == int.end-int.start) {
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

    if (filtered.length == 7) {
      return true
    }
    return false
  },

  // newShifts look like:
  /*
    [
    {
        name: "emp1",
        shifts: [{timeint}, {timeint}, {timeint}, ...]
    },
    {
        name: "emp2",
        shifts: [{timeint}, {timeint}, {timeint}, ...]
    },
    ...
    ]
  */
  validate_shifts: function(newShifts) {
    newShifts.forEach((emp) => {
      let filtered = null
      try {
        filtered = emp.shifts.filter((int) => {
          
        })
      }
    })
  }

}

module.exports = {server_helper}
