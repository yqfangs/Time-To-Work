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



const changePW = document.querySelector('#personalInfo');
changePW.addEventListener('click', requestChangePassword);

const newPW = document.querySelector('#newPasswordForm');
const pwSubmit = document.querySelector('#changePWSubmit');
pwSubmit.addEventListener('click', checkPwMatch);

const passwordModal = document.querySelector('#passwordBody');

const uploadPicture = document.querySelector('#uploadPicture');
uploadPicture.addEventListener('submit', changeProfilePic);

function requestChangePassword(e){
  e.preventDefault();
  if (e.target.classList.contains('changePassword')){
    console.log('change password');
  }
}
function checkPwMatch(e){
  e.preventDefault();
  console.log('Checking');
  var signuppassword = document.getElementById("newPassword").value;
  var confirmpw = document.getElementById("cnewPassword").value;

  if(signuppassword == null || signuppassword == ""){
    alert("Please enter your password");
    return false;
  }
  if(confirmpw == null || confirmpw == ""){
    alert("Please enter your confirm password");
    return false;
  }
  //password not match
  if(signuppassword != confirmpw){
    document.getElementById("pw").value = "";
    document.getElementById("cpw").value = "";
    alert("Please make sure your password and confirm password are matching");
    return false;
  }
  //otherwise is valide sign up
  successChange();
  //point to the log in page
}

function successChange(){
  passwordModal.innerHTML = '<p>Your request has been sent to the admin.</p>';
  document.getElementById('changePWFooter').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
}

function changeProfilePic(e){
  e.preventDefault();
  console.log('hiiii');
  var file = document.getElementById("myPic").files[0];
  document.getElementById("pic").src = file.name;

}
function domProfileChange(filename){
  
}
