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

const aliceDailyAvail = new TimeInterval(8, 15)
const bobDailyAvail = new TimeInterval(9, 16)
let aliceWeeklyAvail = []
let bobWeeklyAvail = []

for (let i = 0; i < 5; i++) {
  aliceWeeklyAvail.push(aliceDailyAvail)
  bobWeeklyAvail.push(bobDailyAvail)
}

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail))



const availTable = document.querySelector('#AvailabilityTable')



availTable.addEventListener('click', updateAvail)

function updateAvail() {
  e.preventDefault()


  if (e.target.classList.contains('dayCell')) {
    let start = askStart()
    let end = askEnd()

  }
}

function askStart() {
  let start = promp("Please enter start time", "")
  if (start == null) {
    askStart()
  }
  else
    return start
}
