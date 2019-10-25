'use strict';

// ------------ from Employee.js --------------
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
aliceWeeklyAvail[6] = new TimeInterval(8, 12)

allEmployees.push(new Employee('Alice', '123', 'waitress', aliceWeeklyAvail))
allEmployees.push(new Employee('Bob', '123', 'cook', bobWeeklyAvail))



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
    const start = startTimeInput.value
    const end = endTimeInput.value
    const selectedInterval = allEmployees[loginID].availability[currentlySelected]
    if (start != "" && end != "" && !isNaN(start) && !isNaN(end) && Number(start) < Number(end) && Number(start) >= 0 && Number(end) <= 24) {
      selectedInterval.start = Number(start)
      selectedInterval.end = Number(end)
      selectedInterval.duration = end - start
      addNewAvailToTable(start, end)
    }
    else {
      console.log(start)
      console.log(end)
      alert("Please enter a valid input!")
    }
  }

  function addNewAvailToTable(start, end) {
    availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = start + '-' + end
  }


}
