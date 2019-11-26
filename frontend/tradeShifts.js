'use strict'

const log = console.log

const currUser = current_user
const myCoworkers = currUser.getCompany().employees
let mySelectedDay = 0    // day of week selected to trade
let tradeOptionSelected = null    // person to trade with
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
const daysOfWeekText = ["Monday", "Tuesday", "wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));

const modalContent = document.querySelector("#modalContent")
const myShiftsList = document.querySelector("#myShiftsList")
const tradeOptionList = document.querySelector("#tradeOptionList")

window.addEventListener("load", loadData)
tradeOptionList.addEventListener("click", updateSelectedOption)


function updateSelectedOption(e) {
  e.preventDefault()
  if (e.target.classList.contains("selectOpt")) {
    const name = (e.target.innerHTML.trim().split(" "))[1]
    tradeOptionSelected = myCoworkers.filter(cw => cw.name == name)[0]
  }
}


function modalLoad() {
  if (myShiftsList.children[mySelectedDay].innerText.split(":")[1].trim() == "No Shift") {
    modalContent.firstElementChild.innerText = `Ask ${tradeOptionSelected.name} for switching to their shift on ${daysOfWeekText[mySelectedDay]}?`
  }
  else {
    modalContent.firstElementChild.innerText = `Ask ${tradeOptionSelected.name} to substitute for your shift on ${daysOfWeekText[mySelectedDay]}?`
  }
}


function loadData() {
  //load shift list on the left
  let i = 0
  const lst = myShiftsList.children
  for (let i = 0; i < lst.length; i++) {
    const userShift = currUser.shifts[i]
    if (userShift != null) {
      lst[i].firstElementChild.innerText = `${userShift.start} - ${userShift.end}`
    }
  }

  //load trade selection list (default monday)
  updateList()
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
      if (compareIntervals(cw.availability[mySelectedDay], currUser.shifts[mySelectedDay])) {
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
