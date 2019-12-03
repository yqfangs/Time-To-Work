'use strict';



let dayOfWeek = 0   // Display Monday Schedule by default



let currentUser = null
let myEmployees = null
let myCompany = null
let timeOpen = null
let timeClosed = null

const colours = {
  "waiter": "table-success",
  "waitress": "table-success",
  "cook": "table-primary",
  "supervisor": "table-warning",
  "cashier": "table-info"
}


const selectAvailModal = document.querySelector("#selectAvailModal")
const availTable = document.querySelector("#availTable")
const modalTitle = document.querySelector("#modalTitle")
const modalBody = document.querySelector("#modalBody")
const scheduleTable = document.querySelector("#scheduleTable")
const modalConfirmButton = document.querySelector("#modalConfirmButton")
const dropdownDiv = document.querySelector("#dropdownDiv")

availTable.addEventListener("click", modalLoadSelected)
scheduleTable.addEventListener("click", scheduleTableEvent)
modalConfirmButton.addEventListener("click", addShift)
dropdownDiv.addEventListener("click", changeDayOfWeek)
window.addEventListener("load", firstLoad)

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(currentUser));

function modalLoadSelected(e) {
  e.preventDefault()
  if (e.target.classList.contains("selectAvailButton")) {
    let employee = null
    for (const emp of myEmployees) {
      if (emp.name == e.target.innerText.trim()) {
        employee = emp
        break
      }
    }

    modalTitle.innerText = `Add ${employee.name} to Schedule`
    modalBody.firstElementChild.innerText = (employee.availability[dayOfWeek])? `Availability: ${employee.availability[dayOfWeek]}` : `Availability: Not available`
    modalBody.firstElementChild.nextElementSibling.innerText = `Currently scheduled hours: ${totalHours(employee.shifts)}`
    modalBody.firstElementChild.nextElementSibling.nextElementSibling.innerText = `Position: ${employee.position}`

  }
}


function changeDayOfWeek(e) {
  e.preventDefault()
  if (e.target.classList.contains('dropdown-item')) {
    dropdownDiv.previousElementSibling.innerText = e.target.innerText

    let i = 0
    for (; i < 7; i++) {
      if (dropdownDiv.children[i] == e.target) {
        dayOfWeek = i
        break
      }
    }
    removeAllTableRows()
    loadData()
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
    alert(`Please enter a valid input! \nHours of operation: ${myCompany.openHours}`)
    return;
  }
  const name = e.target.parentElement.parentElement.parentElement.previousElementSibling.innerText.trim()
  const employeeCell = e.target.parentElement.parentElement.parentElement.parentElement.parentElement
  let employee = null

  for (let i = 0; i < myEmployees.length; i++) {
    if (myEmployees[i].name == name) {
      employee = myEmployees[i]
      const newInt = new TimeInterval(start, end)
      if (!compareIntervals(employee.availability[dayOfWeek], newInt)) {
        alert(`Please enter a valid input! This employee's availability is: ${employee.availability[dayOfWeek]}`)
        return;
      }
      employee.shifts[dayOfWeek] = newInt
      break;
    }
  }

  updateScheduleTable(employee, employeeCell)

  submitToServer(employee)

}


function removeShift(e) {
  e.preventDefault()

  const nameButton = e.target.parentElement.parentElement.parentElement.previousElementSibling
  const name = nameButton.innerText.trim()
  let employee = null

  for (let i = 0; i < myEmployees.length; i++) {
    if (myEmployees[i].name == name) {
      employee = myEmployees[i]
      break;
    }
  }

  employee.shifts[dayOfWeek] = null
  removeShiftFromTable(employee)

  submitToServer(employee)

}


function addShift(e) {
  e.preventDefault()
  if (e.target.id == "modalConfirmButton") {
    const name = e.target.parentElement.previousElementSibling.previousElementSibling.firstElementChild.innerText.trim().split(" ")[1]
    let employee = null

    for (let i = 0; i < myEmployees.length; i++) {
      if (myEmployees[i].name == name) {
        employee = myEmployees[i]
        break;
      }
    }

    employee.shifts[dayOfWeek] = employee.availability[dayOfWeek]
    addShiftToTable(employee)

    submitToServer(employee)

  }
}


function loadData(e) {
  //e.preventDefault()

    // DOM

    const timeBd = document.createElement("tbody")
    const timeRow = document.createElement("tr")

    timeRow.appendChild(document.createElement("th"))
    for (let i = timeOpen; i <= timeClosed; i++) {
      const timeCell = document.createElement("th")
      timeCell.innerText = String(i)
      timeRow.appendChild(timeCell)
    }
    timeRow.firstElementChild.className = "nameHead"

    timeBd.appendChild(timeRow)
    scheduleTable.appendChild(timeBd)
    availTable.appendChild(timeBd.cloneNode(true))


    for (const employee of myEmployees) {
      const shiftTr = document.createElement("tr")
      const availTr = document.createElement("tr")
      shiftTr.id = `${employee.name}ShiftRow`
      availTr.id = `${employee.name}AvailRow`

      let availStart = 0
      let availEnd = 0
      const availInterval = employee.availability[dayOfWeek]
      if (availInterval != null){
        availStart = availInterval.start
        availEnd = availInterval.end
      }

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
                  <input type="number" class="form-control form-control-sm scheduleStartTimeInput" placeholder="${availStart}">
                  <label>End Time</label>
                  <input type="number" class="form-control form-control-sm scheduleEndTimeInput" placeholder="${availEnd}">
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

      for (let i = timeOpen; i <= timeClosed; i++) {
        shiftTr.appendChild(document.createElement("td"))
        availTr.appendChild(document.createElement("td"))
      }

      if (employee.shifts[dayOfWeek] == null) {
        shiftTr.className = "d-none"
      }
      if (employee.availability[dayOfWeek] == null) {
        availTr.className = "d-none"
      }
      if (employee.shifts[dayOfWeek] && employee.availability[dayOfWeek]) {
        availTr.className = "d-none"
      }


      updateScheduleTable(employee, shiftTr.firstElementChild)
      updateAvailTable(employee, availTr.firstElementChild)

      scheduleTable.firstElementChild.appendChild(shiftTr)
      availTable.firstElementChild.appendChild(availTr)
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

  if (!employee.availability[dayOfWeek]) {
    return
  }

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


function removeAllTableRows() {
  scheduleTable.removeChild(scheduleTable.firstElementChild)
  availTable.removeChild(availTable.firstElementChild)

}


function checkStartEnd(s, e) {
  if (s >= myCompany.openHours.start && e <= myCompany.openHours.end && s < e) {
    return true
  }
  return false
}


function submitToServer(employee) {
  const url = '/api/scheduling'

  const data = {
    "email": employee.email,
    "companyName": employee.companyName,
    "shifts": employee.shifts
  }

  const request = new Request(url, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
  })

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      alert('New schedule is successfully submitted to server!')

    }
    else {
      return Promise.reject()
    }
  })
  .catch((error) => {
    window.location.reload()
    alert('Submission to server is unsuccessful.')

  })
}

function firstLoad(e) {
  e.preventDefault()

  //Server call to get currentUser
  const url_user = '/api/scheduling/user'

  fetch(url_user)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your data from server')
    }
  })
  .then((json) => {
    currentUser = convertToEmployer(json)
    modifySideBar(currentUser)
  })


  // Server call to get my company
  const url_comp = '/api/scheduling/company'

  fetch(url_comp)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your company data from server')
    }
  })
  .then((json) => {
    myCompany = convertToCompany(json)
    timeOpen = myCompany.openHours.start
    timeClosed = myCompany.openHours.end
  })

  // Server call to get my employees
  const url_data = '/api/scheduling'

  fetch(url_data)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get employees from server')
    }
  })
  .then((json) => {
    myEmployees = json.map((obj) => convertToEmployee(obj))

    loadData()
  })
}
