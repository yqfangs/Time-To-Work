'use strict';

const allEmployees = []
const allEmployers = []

// -------------- setting up mock info ----------------

allEmployees.push(new Employee('Alice', '123', 'alice@mail.com', 'waitress', '121345678'));
allEmployees.push(new Employee('Bob', '123', 'bob@mail.com', 'cook', '123456798'));
allEmployees.push(new Employee('Caitlyn', '123', 'caitlyn@mail.com', 'cook', '1236879089'));
allEmployees.push(new Employee('Darius', '123', 'darius@mail.com', 'supervisor', '7896751673'));

allEmployers.push(new Employer('employer1', '123', 'employer1@mail.com', '123567989', 'company1'));

const current_user = allEmployees[0]; //store the current user
console.log(allEmployers[0]);

for (let i = 0; i < 7; i++) {
  allEmployees[0].availability.push(new TimeInterval(8, 15))
  allEmployees[1].availability.push(new TimeInterval(9, 16))
  allEmployees[2].availability.push(new TimeInterval(8, 15))
  allEmployees[3].availability.push(new TimeInterval(9, 16))
}

allEmployees[0].shifts[0] = new TimeInterval(8, 15)
allEmployees[0].shifts[2] = new TimeInterval(12, 20)
allEmployees[0].shifts[3] = new TimeInterval(9, 17)
allEmployees[0].shifts[6] = new TimeInterval(16, 24)
allEmployees[1].shifts[1] = new TimeInterval(9, 16)


const changePW = document.querySelector('#personalInfo');
changePW.addEventListener('click', requestChangePassword);

const newPW = document.querySelector('#newPasswordForm');
const pwSubmit = document.querySelector('#changePWSubmit');
pwSubmit.addEventListener('click', checkPwMatch);

const passwordModal = document.querySelector('#passwordBody');

const uploadPicture = document.querySelector('#uploadPicture');
uploadPicture.addEventListener('submit', changeProfilePic);

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));

const personalInfo = document.querySelector('#personalInfo');
window.addEventListener('load', loadPersonalInfo(current_user));

function loadPersonalInfo(user){
  const userInfo = [user.name, user.userID, user.email, user.phone, user.position];
  console.log(userInfo);
  const infoList = personalInfo.children;
  console.log(infoList);
  for(var i = 0; i < 5; i++){
    const info = document.createElement('div');
    info.className = 'col-3';
    const p = document.createElement('p');
    if(userInfo[i] != undefined){
    const text = document.createTextNode(userInfo[i]);
    p.appendChild(text);
    info.appendChild(p);
    infoList[i].appendChild(info);
    }
  }
  
}

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
    document.getElementById("newPassword").value = "";
    document.getElementById("cnewPassword").value = "";
    alert("Please make sure your password and confirm password are matching");
    return false;
  }
  //otherwise is valide sign up
  successChange();
  //point to the log in page
}

function successChange(){
  passwordModal.innerHTML = '<p>Your password has been changed!</p>';
  document.getElementById('changePWFooter').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
}

function changeProfilePic(e){
  e.preventDefault();
  var file = document.getElementById("myPic").files[0];
  document.getElementById("pic").src = file.name;

}

