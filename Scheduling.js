'use strict';

let allEmployees = []


class Employee {
  constructor(name, password, position, availability, shifts) {
    this.name = name
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

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail, aliceWeeklyShifts))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail, bobWeeklyShifts))
allEmployees.push(new Employee('Caitlyn', '123', 'cook', caitlynWeeklyAvail, caitlynWeeklyShifts))
allEmployees.push(new Employee('Darius', '123', 'supervisor', dariusWeeklyAvail, dariusWeeklyShifts))




const dayOfWeek = 0
const timeOpen = 8
const timeClosed = 24
const colours = {
  "waiter": "table-success",
  "waitress": "table-success",
  "cook": "table-primary",
  "supervisor": "table-warning"
}


const selectAvailModal = document.querySelector("#selectAvailModal")
const availTable = document.querySelector("#availTable")
const modalTitle = document.querySelector("#modalTitle")
const scheduleTable = document.querySelector("#scheduleTable")
const modalConfirmButton = document.querySelector("#modalConfirmButton")

availTable.addEventListener("click", modalLoadSelected)
scheduleTable.addEventListener("click", scheduleTableEvent)
modalConfirmButton.addEventListener("click", addShift)

function modalLoadSelected(e) {
  e.preventDefault()
  if (e.target.classList.contains("selectAvailButton")) {
    modalTitle.innerText = `Add ${e.target.innerText} to Schedule`
  }
}

function scheduleTableEvent(e) {
  if (e.target.classList.contains("scheduleSubmitButton")) {
    updateShift(e)
  }
  else if (e.target.classList.contains("scheduleRemoveButton")) {
    removeShift(e)
  }
}


function updateShift(e) {
  e.preventDefault()

  const end = Number(e.target.previousElementSibling.value)
  const start = Number(e.target.previousElementSibling.previousElementSibling.previousElementSibling.value)
  if (!checkStartEnd(start, end)) {
    console.log(start, end)
    alert("Please enter valid inputs!")
    return
  }
  const name = e.target.parentElement.parentElement.parentElement.previousElementSibling.innerText.trim()
  const employeeCell = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
  let employee = null

  for (let i = 0; i < allEmployees.length; i++) {
    if (allEmployees[i].name == name) {
      employee = allEmployees[i]
      employee.shifts[dayOfWeek] = new TimeInterval(start, end)
      break;
    }
  }

  updateScheduleTable(employee, employeeCell)

}


function removeShift(e) {
  e.preventDefault()

  const nameButton = e.target.parentElement.parentElement.parentElement.previousElementSibling
  const name = nameButton.innerText.trim()
  let employee = null

  for (let i = 0; i < allEmployees.length; i++) {
    if (allEmployees[i].name == name) {
      employee = allEmployees[i]
      break;
    }
  }

  employee.shifts[dayOfWeek] = null
  removeShiftFromTable(employee)
}


function addShift(e) {
  e.preventDefault()
  if (e.target.id == "modalConfirmButton") {
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText.trim().split(" ")[1]
    let employee = null

    for (let i = 0; i < allEmployees.length; i++) {
      if (allEmployees[i].name == name) {
        employee = allEmployees[i]
        break;
      }
    }

    employee.shifts[dayOfWeek] = employee.availability[dayOfWeek]
    addShiftToTable(employee)

  }
}


function updateScheduleTable(employee, cell) {
  let i = 1
  let currCell = cell.nextElementSibling

  // moves to the cell of start time while erasing existing colour
  while (i < employee.shifts[dayOfWeek].start+1-timeOpen) {
    currCell.className = "";
    currCell = currCell.nextElementSibling
    i++
  }

  while (i < employee.shifts[dayOfWeek].end+1-timeOpen) {
    currCell.className = colours[employee.position]   // assigns corresponding colour to their position
    currCell = currCell.nextElementSibling
    i++
  }

  while (i < timeClosed-timeOpen) {
    currCell.className = "";
    currCell = currCell.nextElementSibling
    i++
  }
}


function addShiftToTable(employee) {
  const displayRow = document.querySelector(`#${employee.name}ShiftRow`)
  const hideRow = document.querySelector(`#${employee.name}AvailRow`)
  displayRow.className = ""
  hideRow.className = "d-none"
}

function removeShiftFromTable(employee) {
  const hideRow = document.querySelector(`#${employee.name}ShiftRow`)
  const displayRow = document.querySelector(`#${employee.name}AvailRow`)
  displayRow.className = ""
  hideRow.className = "d-none"
}
