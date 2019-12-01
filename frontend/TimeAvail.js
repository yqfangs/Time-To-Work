'use strict'

// ----- the following are all related to manipulation of TimeAvail page -----

// integer 0 to 6 corresponding to day of a week currently selected by dropdown
let currentlySelected = 0

// the id of employee currently logged in
// const currentUser = current_user
let currentUser = null  // this should be current_user, but logging in as
                            // an employer (default) will not have access to this page

const availTable = document.querySelector('#AvailabilityTable')
const availRow = document.querySelector('#availRow')
const dropdownDiv = document.querySelector('#dropdownDiv')
const title = document.querySelector('#title')
const submitAvailButton = document.querySelector('#submitAvailButton')
const submitAllButton = document.querySelector('#submitAllButton')
const startTimeInput = document.querySelector('#startTime')
const endTimeInput = document.querySelector('#endTime')

dropdownDiv.addEventListener('click', changeSelected)
submitAvailButton.addEventListener('click', submitNewAvail)
submitAllButton.addEventListener('click', submitToServer)
window.addEventListener('load', loadAvailTable)

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(currentUser));



function submitToServer(e) {
  e.preventDefault()
  if (e.target.id == 'submitAllButton') {
    const url = '/TimeAvail'

    const data = {
      id: currentUser.id,
      availability: currentUser.availability
    }

    const request = new Request(url, {
      method: 'patch',
      body: JSON.stringify(data),
      headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        }
    })

    fetch(request)
    .then((res) => {
      if (res.status === 200) {
        alert('New availability submitted!')
      }
      else {
        return Promise.reject()
      }
    })
    .catch((error) => {
      log(error)
      alert('Submission is unsuccessful.')
    })
  }
}

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


function checkStartEnd(s, e) {
  if (s >= 0 && e <= 24 && s < e) {
    return true
  }
  return false
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
      alert(`Please enter a valid input!`)
    }
  }
}

function loadAvailTable(e) {
  // Server call to get current user
  const url = '/TimeAvail/load'
  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your availability from server')
    }
  })
  .then((json) => {
    currentUser = JSON.parse(json)
  })
  .catch((error) => {
    log(error)
    alert('Error')
  })

  // DOM
  title.innerText = `${currentUser.name}'s ${title.innerText}`

  let curr = availRow.firstElementChild.nextElementSibling
  for (let i = 0; i < 7; i++) {
    let availStart = 0
    let availEnd = 0
    const availInterval = currentUser.availability[i]
    if (availInterval != null) {
      availStart = availInterval.start
      availEnd = availInterval.end
    }
    curr.innerText = `${availStart} - ${availEnd}`
    curr = curr.nextElementSibling
  }
  if (currentUser.availability[0] != null) {
    startTimeInput.placeholder = currentUser.availability[0].start
    endTimeInput.placeholder = currentUser.availability[0].end
  }
}

function addNewAvailToTable(start, end) {
  availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = start + '-' + end
}
