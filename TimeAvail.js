'use strict';

let allEmployees = []


class Employee {
  constructor(name, email, password, position, availability, shifts) {
    this.name = name
    this.email = email
    this.userID = allEmployees.length
    this.password = password
    this.position = position
    this.availability = availability
    this.shifts = shifts
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

allEmployees.push(new Employee('Alice', 'Alice@mail.com', '123', 'waitress', aliceWeeklyAvail, aliceWeeklyShifts))
allEmployees.push(new Employee('Bob', 'Bob@mail.com', '123', 'cook', bobWeeklyAvail, bobWeeklyShifts))
allEmployees.push(new Employee('Caitlyn', 'Caitlyn', '123', 'cook', caitlynWeeklyAvail, caitlynWeeklyShifts))
allEmployees.push(new Employee('Darius', 'Darius', '123', 'supervisor', dariusWeeklyAvail, dariusWeeklyShifts))



// ----- the following are all related to manipulation of TimeAvail page -----

// integer 0 to 6 corresponding to day of a week currently selected by dropdown
let currentlySelected = 0

// the id of employee currently logged in
const loginID = 0

const availTable = document.querySelector('#AvailabilityTable')
const dropdownDiv = document.querySelector('#dropdownDiv')
const submitAvailButton = document.querySelector('#submitAvailButton')
const startTimeInput = document.querySelector('#startTime')
const endTimeInput = document.querySelector('#endTime')

dropdownDiv.addEventListener('click', changeSelected)
submitAvailButton.addEventListener('click', submitNewAvail)

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
    startTimeInput.placeholder = allEmployees[loginID].availability[i].start
    endTimeInput.placeholder = allEmployees[loginID].availability[i].end
  }
}

function submitNewAvail(e) {
  e.preventDefault()

  if (e.target.id == 'submitAvailButton') {
    const start = Number(startTimeInput.value)
    const end = Number(endTimeInput.value)

    if (checkStartEnd(Number(start), Number(end)) {
      allEmployees[loginID].availability[currentlySelected] = new TimeInterval(start, end)
      addNewAvailToTable(start, end)
    }
    else {
      alert("Please enter a valid input!")
    }
  }

  function addNewAvailToTable(start, end) {
    availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = start + '-' + end
  }


}
