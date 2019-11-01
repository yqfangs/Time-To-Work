'use strict';

let allEmployees = []


class Employee {
  constructor(name, password, email, position, phone) {
    this.name = name
    this.email = email
    this.userID = allEmployees.length
    this.password = password
    this.position = position
    this.phone = phone
    this.availability = []
    this.shifts = []
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


// returns if the start and end time are valid for an interval (call before creating the interval)
function checkStartEnd(s, e) {
  if (s >= 8 && e <= 24 && s < e) {
    return true
  }
  return false
}


// -------------- setting up mock info ----------------

let aliceWeeklyAvail = []
let bobWeeklyAvail = []
let caitlynWeeklyAvail = []
let dariusWeeklyAvail = []

let aliceWeeklyShifts = []
let bobWeeklyShifts = []
let caitlynWeeklyShifts = []
let dariusWeeklyShifts = []


for (let i = 0; i < 7; i++) {
  aliceWeeklyAvail.push(new TimeInterval(8, 15))
  bobWeeklyAvail.push(new TimeInterval(9, 16))
  caitlynWeeklyAvail.push(new TimeInterval(8, 15))
  dariusWeeklyAvail.push(new TimeInterval(9, 16))
  aliceWeeklyShifts.push(null)
  bobWeeklyShifts.push(null)
  caitlynWeeklyShifts.push(null)
  dariusWeeklyShifts.push(null)
}
aliceWeeklyAvail[6] = new TimeInterval(8, 12) // Alice has different availability on Sunday

aliceWeeklyShifts[0] = new TimeInterval(8, 15)
bobWeeklyShifts[0] = new TimeInterval(9, 16) //Alice and Bob has scheduled work shifts

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail, aliceWeeklyShifts))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail, bobWeeklyShifts))
allEmployees.push(new Employee('Caitlyn', '123', 'cook', caitlynWeeklyAvail, caitlynWeeklyShifts))
allEmployees.push(new Employee('Darius', '123', 'supervisor', dariusWeeklyAvail, dariusWeeklyShifts))
