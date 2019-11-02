'use strict'

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

// returns the total number of hours in an array of Intervals
function totalHours(intArray) {
  let sum = 0
  for (const interval of intArray) {
    if (interval != null) {
      sum += interval.duration
    }
  }
  return sum
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

allEmployees.push(new Employee('Alice', '123', 'alice@mail.com', 'waitress', '000'))
allEmployees.push(new Employee('Bob', '123', 'cook', 'bob@mail.com', '001'))
allEmployees.push(new Employee('Caitlyn', '123', 'cook', 'caitlyn@mail.com', '002'))
allEmployees.push(new Employee('Darius', '123', 'supervisor', 'darius@mail.com', '003'))

allEmployees[0].availability = aliceWeeklyAvail
allEmployees[1].availability = bobWeeklyAvail
allEmployees[2].availability = caitlynWeeklyAvail
allEmployees[3].availability = dariusWeeklyAvail
allEmployees[0].shifts = aliceWeeklyShifts
allEmployees[1].shifts = bobWeeklyShifts
allEmployees[2].shifts = caitlynWeeklyShifts
allEmployees[3].shifts = dariusWeeklyShifts





// ----- the following are all related to manipulation of TimeAvail page -----

// integer 0 to 6 corresponding to day of a week currently selected by dropdown
let currentlySelected = 0

// the id of employee currently logged in
const currentUser = allEmployees[0]

const availTable = document.querySelector('#AvailabilityTable')
const availRow = document.querySelector('#availRow')
const dropdownDiv = document.querySelector('#dropdownDiv')
const submitAvailButton = document.querySelector('#submitAvailButton')
const startTimeInput = document.querySelector('#startTime')
const endTimeInput = document.querySelector('#endTime')

dropdownDiv.addEventListener('click', changeSelected)
submitAvailButton.addEventListener('click', submitNewAvail)
window.addEventListener('load', loadAvailTable)

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(currentUser));

function changeSelected(e) {
  e.preventDefault()
  if (e.target.classList.contains('dropdown-item')) {
    dropdownDiv.previousElementSibling.innerText = e.target.innerText

    let i = 0
    for (; i < 7; i++) {
      if (dropdownDiv.children[i] == e.target) {
        currentlySelected = i
        break
      }
    }
    startTimeInput.placeholder = currentUser.availability[i].start
    endTimeInput.placeholder = currentUser.availability[i].end
  }
}

function submitNewAvail(e) {
  e.preventDefault()

  if (e.target.id == 'submitAvailButton') {
    const start = Number(startTimeInput.value)
    const end = Number(endTimeInput.value)

    if (checkStartEnd(Number(start), Number(end))) {
      currentUser.availability[currentlySelected] = new TimeInterval(start, end)
      addNewAvailToTable(start, end)
    }
    else {
      alert("Please enter a valid input!")
    }
  }
}

  function loadAvailTable(e) {
    let curr = availRow.firstElementChild.nextElementSibling
    for (let i = 0; i < 7; i++) {
      curr.innerText = `${currentUser.availability[i].start} - ${currentUser.availability[i].end}`
      curr = curr.nextElementSibling
    }
    startTimeInput.placeholder = currentUser.availability[0].start
    endTimeInput.placeholder = currentUser.availability[0].end
  }

  function addNewAvailToTable(start, end) {
    availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = start + '-' + end
  }
