'use strict'

// const log = console.log

// ----- the following are all related to manipulation of TimeAvail page -----

// integer 0 to 6 corresponding to day of a week currently selected by dropdown
let currentlySelected = 0

// the id of employee currently logged in
// const currentUser = current_user
let currentUser = null  // this should be current_user, but logging in as
                            // an employer (default) will not have access to this page
let myCompany = null

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
    const url = '/api/TimeAvail'

    const data = {
      companyName: myCompany.name,
      availability: currentUser.availability
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
        window.location.reload()
        alert('New availability submitted!')
      }
      else {
        return Promise.reject()
      }
    })
    .catch((error) => {
      window.location.reload()
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
    // if (currentUser.availability[i]) {
    //   startTimeInput.placeholder = currentUser.availability[i].start
    //   endTimeInput.placeholder = currentUser.availability[i].end
    // }
    // else {
    //   startTimeInput.placeholder = ``
    //   endTimeInput.placeholder = ``
    // }
  }
}


function checkStartEnd(s, e) {
  if (s < myCompany.openHours.start || e > myCompany.openHours.end) {
    return false
  }
  return s < e
}


function submitNewAvail(e) {
  e.preventDefault()

  if (e.target.id == 'submitAvailButton') {
    const start = Number(startTimeInput.value)
    const end = Number(endTimeInput.value)

    if (startTimeInput.value == `` && endTimeInput.value == ``) {
      currentUser.availability[currentlySelected] = null
      addNewAvailToTable()
    }
    else if (checkStartEnd(Number(start), Number(end))) {
      currentUser.availability[currentlySelected] = new TimeInterval(start, end)
      addNewAvailToTable(start, end)
    }
    else {
      alert(`Please enter a valid input! Open hours: ${myCompany.openHours}`)
    }
  }
}

function loadAvailTable(e) {
  // Server call to get myCompany

  const url_comp = '/api/TimeAvail/company'

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
  })

  // Server call to get current user
  const url = '/api/TimeAvail'

  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your availability from server')
    }
  })
  .then((json) => {
    currentUser = convertToEmployee(json)
    modifySideBar(currentUser)

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
        curr.innerText = `${availStart} - ${availEnd}`
      } else {
        curr.innerText = `Not available`
      }
      curr = curr.nextElementSibling
    }
    // if (currentUser.availability[currentlySelected] != null) {
    //   startTimeInput.placeholder = currentUser.availability[currentlySelected].start
    //   endTimeInput.placeholder = currentUser.availability[currentlySelected].end
    // }

  })
  .catch((error) => {
    log(error)
    alert('Error')
  })
}

function addNewAvailToTable(start, end) {
  if (start && end) {
    availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = start + ' - ' + end
  } else {
    availTable.firstElementChild.lastElementChild.children[currentlySelected+1].innerText = `Not available`
  }
  startTimeInput.value = ``
  endTimeInput.value = ``
}
