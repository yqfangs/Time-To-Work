'use strict';

// const imp = require('./Employee.js')
//
// const Employee = imp.Employee
// const allEmployees = imp.allEmployees
// const compareIntervals = imp.fns.compareIntervals
// const checkStartEnd = imp.fns.checkStartEnd
// const totalHours = imp.fns.totalHours

let allEmployees = []
const allEmployers = []


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
allEmployees.push(new Employee('Bob', '123', 'bob@mail.com', 'cook', '001'))
allEmployees.push(new Employee('Caitlyn', '123', 'caitlyn@mail.com', 'cook', '002'))
allEmployees.push(new Employee('Darius', '123', 'darius@mail.com', 'supervisor', '003'))

allEmployers.push(new Employer('employer1', '123', 'employer1@mail.com', '123567989', 'company1'));

allEmployees[0].availability = aliceWeeklyAvail
allEmployees[1].availability = bobWeeklyAvail
allEmployees[2].availability = caitlynWeeklyAvail
allEmployees[3].availability = dariusWeeklyAvail
allEmployees[0].shifts = aliceWeeklyShifts
allEmployees[1].shifts = bobWeeklyShifts
allEmployees[2].shifts = caitlynWeeklyShifts
allEmployees[3].shifts = dariusWeeklyShifts

const current_user = allEmployers[0]



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
const modalBody = document.querySelector("#modalBody")
const scheduleTable = document.querySelector("#scheduleTable")
const modalConfirmButton = document.querySelector("#modalConfirmButton")
const body = document.querySelector("body")

availTable.addEventListener("click", modalLoadSelected)
scheduleTable.addEventListener("click", scheduleTableEvent)
modalConfirmButton.addEventListener("click", addShift)
window.addEventListener("load", loadData)

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));

function modalLoadSelected(e) {
  e.preventDefault()
  if (e.target.classList.contains("selectAvailButton")) {
    let employee = null
    for (const emp of allEmployees) {
      if (emp.name == e.target.innerText.trim()) {
        employee = emp
        break
      }
    }

    modalTitle.innerText = `Add ${employee.name} to Schedule`
    modalBody.firstElementChild.innerText = `Availability: ${employee.availability[dayOfWeek].start} - ${employee.availability[dayOfWeek].end}`
    modalBody.firstElementChild.nextElementSibling.innerText = `Currently scheduled hours: ${totalHours(employee.shifts)}`
    modalBody.firstElementChild.nextElementSibling.nextElementSibling.innerText = `Position: ${employee.position}`


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


function loadData(e) {
  //e.preventDefault()

  for (const employee of allEmployees) {
    const shiftTr = document.createElement("tr")
    const availTr = document.createElement("tr")
    shiftTr.id = `${employee.name}ShiftRow`
    availTr.id = `${employee.name}AvailRow`

    shiftTr.innerHTML = `
      <td class="dropdownCell" >
        <div class="dropdown">
          <button class="btn btn-default btn-block dropdown-toggle" type="button" data-toggle="dropdown">
            ${employee.name}
          </button>
          <div class="dropdown-menu">
            <form>
              <div class="form-group col">
                <label>Start Time</label>
                <input type="number" class="form-control form-control-sm scheduleStartTimeInput" placeholder="${employee.availability[dayOfWeek].start}">
                <label>End Time</label>
                <input type="number" class="form-control form-control-sm scheduleEndTimeInput" placeholder="${employee.availability[dayOfWeek].end}">
                <button class="btn btn-primary btn-sm scheduleSubmitButton" type="button" style="margin-top: 5px;">Update</button>
                <button class="btn btn-danger btn-sm scheduleRemoveButton" type="button" style="margin-top: 5px;">Remove</button>
              </div>
            </form>
          </div>
        </div>
      </td>`

    availTr.innerHTML = `
      <td class="dropdownCell">
        <button class="btn btn-default btn-block selectAvailButton" data-toggle="modal" data-target="#selectAvailModal">
          ${employee.name}
        </button>
      </td>`

    for (let i = 8; i <= 24; i++) {
      shiftTr.appendChild(document.createElement("td"))
      availTr.appendChild(document.createElement("td"))
    }

    if (employee.shifts[dayOfWeek] == null) {
      shiftTr.className = "d-none"
      updateAvailTable(employee, availTr.firstElementChild)
    }
    else {
      availTr.className = "d-none"
      updateScheduleTable(employee, shiftTr.firstElementChild)
    }
    scheduleTable.appendChild(shiftTr)
    availTable.appendChild(availTr)
  }

}


function updateScheduleTable(employee, cell) {
  let i = 1
  let currCell = cell.nextElementSibling

  // moves to the cell of start time while erasing existing colour
  if (employee.shifts[dayOfWeek] != null) {
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
  }

  while (i < timeClosed-timeOpen+2) {
    currCell.className = "";
    currCell = currCell.nextElementSibling
    i++
  }
}


function updateAvailTable(employee, cell) {
  let i = 1
  let currCell = cell.nextElementSibling

  // moves to the cell of start time while colouring grey
  while (i < employee.availability[dayOfWeek].start+1-timeOpen) {
    currCell.className = "table-secondary";
    currCell = currCell.nextElementSibling
    i++
  }

  while (i < employee.availability[dayOfWeek].end+1-timeOpen) {
    currCell.className = colours[employee.position]   // assigns corresponding colour to their position
    currCell = currCell.nextElementSibling
    i++
  }

  while (i < timeClosed-timeOpen+2) {
    currCell.className = "table-secondary";
    currCell = currCell.nextElementSibling
    i++
  }
}


function addShiftToTable(employee) {
  const displayRow = document.querySelector(`#${employee.name}ShiftRow`)
  const hideRow = document.querySelector(`#${employee.name}AvailRow`)
  updateScheduleTable(employee, displayRow.firstElementChild)
  displayRow.className = ""
  hideRow.className = "d-none"
}

function removeShiftFromTable(employee) {
  const hideRow = document.querySelector(`#${employee.name}ShiftRow`)
  const displayRow = document.querySelector(`#${employee.name}AvailRow`)
  updateScheduleTable(employee, hideRow.firstElementChild)
  displayRow.className = ""
  hideRow.className = "d-none"
}
