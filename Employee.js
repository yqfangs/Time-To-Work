'use strict';

let allEmployees = []


class Employee {
  constructor(name, password, position, availability) {
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



// -------------- setting up mock info ----------------

let aliceWeeklyAvail = []
let bobWeeklyAvail = []

for (let i = 0; i < 7; i++) {
  aliceWeeklyAvail.push(new TimeInterval(8, 15))
  bobWeeklyAvail.push(new TimeInterval(9, 16))
}

aliceWeeklyAvail[6] = new TimeInterval(8, 12) // Alice has a different schedule on Sunday

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail))
