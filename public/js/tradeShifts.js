'use strict'


let currUser = null
let myCoworkers = null
let mySelectedDay = 0    // day of week selected to trade
let tradeOptionSelected = null    // person to trade with
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const daysOfWeekText = ["Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(currUser));

const modalContent = document.querySelector("#modalContent")
const myShiftsList = document.querySelector("#myShiftsList")
const tradeOptionList = document.querySelector("#tradeOptionList")
const modalConfirmButton = document.querySelector("#modalConfirmButton")
const modalCancelButton = document.querySelector("#modalCancelButton")
const modalTitle = document.querySelector("#modalTitle")

window.addEventListener("load", loadData)
tradeOptionList.addEventListener("click", updateSelectedOption)
modalConfirmButton.addEventListener("click", submitTradeRequest)


function updateSelectedOption(e) {
  e.preventDefault()
  if (e.target.classList.contains("selectOpt")) {
    const name = (e.target.innerHTML.trim().split(" "))[1]
    tradeOptionSelected = myCoworkers.filter(cw => cw.name == name)[0]
  }
}


function modalLoad() {
  if (!tradeOptionSelected) {
    window.location.reload()
    alert("Trade not valid")
  }
  else if (myShiftsList.children[mySelectedDay].innerText.split(":")[1].trim() == "No Shift") {
    modalTitle.innerText = `Hint!`
    modalContent.firstElementChild.innerText = `Ask ${tradeOptionSelected.name} for switching to their shift on ${daysOfWeekText[mySelectedDay]} in
    person and let them create a trade request!`;
    modalConfirmButton.classList.add("d-none")
    modalCancelButton.innerText = `Got it`
  }
  else {
    modalTitle.innerText = `Confirm Trade Request`
    modalContent.firstElementChild.innerText = `Ask ${tradeOptionSelected.name} to substitute for your shift on ${daysOfWeekText[mySelectedDay]}?`
    modalConfirmButton.classList.remove("d-none")
    modalCancelButton.innerText = `Cancel`
  }
}


function loadData() {
  // Server call to get current user
  const url = '/api/tradeshifts/user'

  fetch(url)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your availability from server')
    }
  })
  .then((json) => {
    currUser = convertToEmployee(json)
    modifySideBar(currUser)
  })

  const url_comp = '/api/tradeshifts'

  fetch(url_comp)
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      alert('Cannot get your company data from server')
    }
  })
  .then((json) => {
    myCoworkers = json.map((obj) => convertToEmployee(obj))


    //load shift list on the left
    let i = 0
    const lst = myShiftsList.children
    for (let i = 0; i < lst.length; i++) {
      if (currUser.shifts[i] != null) {
        lst[i].firstElementChild.innerText = `${currUser.shifts[i].start} - ${currUser.shifts[i].end}`
      }
      else {
        lst[i].firstElementChild.innerText = `No Shift`
      }
    }

    //load trade selection list (default monday)
    updateList()
  })
}


function submitTradeRequest(e) {
  e.preventDefault()

  const url = '/api/message/employees/newTradeMessage'

  let dateTime = "";
  if(mySelectedDay === 0){
    dateTime = "Monday"
  }
  else if(mySelectedDay === 1){
    dateTime = "Tuesday"
  }
  else if(mySelectedDay === 2){
    dateTime = "Wednesday"
  }
  else if(mySelectedDay === 3){
    dateTime = "Thursday"
  }
  else if(mySelectedDay === 4){
    dateTime = "Friday"
  }
  else if(mySelectedDay=== 5){
    dateTime = "Saturday"
  }
  else if(mySelectedDay=== 6){
    dateTime = "Sunday"
  }

  const data = {
    from: currUser.email,
    to: tradeOptionSelected.email,
    isTrade: true,
    tradeTime: currUser.shifts[mySelectedDay],
    tradeWeekDay: mySelectedDay,    // 0 = Monday, 1 = Tuesday, ...
    message: "Changing shifts request:[From: " + currUser.shifts[mySelectedDay].start + ", To: " + currUser.shifts[mySelectedDay].end + ", On: " + dateTime + "]",
    tradeResponse: 'W'
  }

  const request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
          'Accept': 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
      },
  })

  fetch(request)
  .then((res) => {
    if (res.status === 200) {
      alert('Trade request submitted!')
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


function updateList() {

  if (myShiftsList.children[mySelectedDay].firstElementChild.innerText == "No Shift") {
    const coworkersToTrade = myCoworkers.filter((cw) => cw.shifts[mySelectedDay] != null)
    const lst = tradeOptionList
    lst.innerHTML = ``
    for (let i = 0; i < coworkersToTrade.length; i++) {
      const cw = coworkersToTrade[i]
      lst.innerHTML += `
      <a class="list-group-item list-item-action selectOpt" data-toggle="list" href="">${daysOfWeek[mySelectedDay]}, ${cw.name} has shift ${cw.shifts[mySelectedDay]}</a>`;
    }
    if (lst.childElementCount != 0) {
      lst.firstElementChild.classList.add("active")
      tradeOptionSelected = coworkersToTrade[0]
    }
    else {
      lst.innerHTML = `<p>Nobody's working on ${daysOfWeek[mySelectedDay]}!</p>`
    }
  }
  else {
    const coworkersToTrade = myCoworkers.filter((cw) => {
      if (!cw.availability[mySelectedDay]) {
        return false
      }
      if (compareIntervals(cw.availability[mySelectedDay], currUser.shifts[mySelectedDay]) && !cw.shifts[mySelectedDay]) {
        return cw.name != currUser.name
      }
    });
    const lst = tradeOptionList
    lst.innerHTML = ``
    for (let i = 0; i < coworkersToTrade.length; i++) {
      const cw = coworkersToTrade[i]
      lst.innerHTML += `
      <a class="list-group-item list-item-action selectOpt" data-toggle="list" href="">${daysOfWeek[mySelectedDay]}: ${cw.name} is available ${cw.availability[mySelectedDay]}</a>`;
    }
    if (lst.childElementCount != 0) {
      lst.firstElementChild.classList.add("active")
      tradeOptionSelected = coworkersToTrade[0]
    }
    else {
      lst.innerHTML = `<p>Sorry. No one is available for the time.</p>`
    }

  }
}


function updateSelectedDay(day) {
  mySelectedDay = day
  updateList()
}
