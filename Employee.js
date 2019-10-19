'use strict';

let allEmployees = []


class Employee {
  constructor(name,  password, position, availability) {
    this.name = name
    this.userID = allEmployees.length
    this.password = password
    this.position = position
    this.availability = availability
  }
}

class TimeInterval {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.duration = end - start
  }
}

// returns true if TimeInterval i1 contains i2, false otherwise
function compareIntervals(i1, i2) {
  return (i1.start <= i2.start && i1.end >= i2.end)
}





// example employees
const aliceDailyAvail = new TimeInterval(8, 15)
const bobDailyAvail = new TimeInterval(9, 16)
let aliceWeeklyAvail = []
let bobWeeklyAvail = []

// the array is of length 7 which corresponds to the available time for
// each day in a week (from Monday to Sunday)

for (let i = 0; i < 7; i++) {
  aliceWeeklyAvail.push(aliceDailyAvail)
  bobWeeklyAvail.push(bobDailyAvail)
}

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail))
