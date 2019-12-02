'use strict';
// const allEmployees = []
// const allEmployers = []

let currentUser = null
// const changePW = document.querySelector('#personalInfo');
// changePW.addEventListener('click', requestChangePassword);

// const newPW = document.querySelector('#newPasswordForm');
// const pwSubmit = document.querySelector('#changePWSubmit');
// pwSubmit.addEventListener('click', checkPwMatch);

// const passwordModal = document.querySelector('#passwordBody');

// const uploadPicture = document.querySelector('#uploadPicture');
// uploadPicture.addEventListener('submit', changeProfilePic);

const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(currentUser));

const personalInfo = document.querySelector('#personalInfo');
window.addEventListener('load', loadPersonalInfo);

function loadPersonalInfo(e){
    log('hihihi')
  // load personal info from server
    const url = '/api/employees'
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        }else{
            alert('could not get employee')
        }
    })
    .then((json) => {
        currentUser = convertToEmployee(json)
        log(currentUser)
        modifySideBar(currentUser)
        log(json);
        const userInfo = [currentUser.name, 1, currentUser.email, currentUser.phone, currentUser.position];
        console.log(userInfo);
        const infoList = personalInfo.children;
        console.log(infoList);
        for(var i = 0; i < 5; i++){
          const info = document.createElement('div');
          info.className = 'col-3 info';
          const p = document.createElement('p');
          if(userInfo[i] != undefined){
            const text = document.createTextNode(userInfo[i]);
            p.appendChild(text);
            info.appendChild(p);
            infoList[i].appendChild(info);
      }
  }
    }).catch((error) => {
        log('erro')
    })
  
}

// function requestChangePassword(e){
//   e.preventDefault();
//   if (e.target.classList.contains('changePassword')){
//     console.log('change password');
//   }
// }
// function checkPwMatch(e){
//   e.preventDefault();
//   console.log('Checking');
//   var signuppassword = document.getElementById("newPassword").value;
//   var confirmpw = document.getElementById("cnewPassword").value;

//   if(signuppassword == null || signuppassword == ""){
//     alert("Please enter your password");
//     return false;
//   }
//   if(confirmpw == null || confirmpw == ""){
//     alert("Please enter your confirm password");
//     return false;
//   }
//   //password not match
//   if(signuppassword != confirmpw){
//     document.getElementById("newPassword").value = "";
//     document.getElementById("cnewPassword").value = "";
//     alert("Please make sure your password and confirm password are matching");
//     return false;
//   }
//   //otherwise is valide sign up

//   //upload the change to the server
//   current_user.password = signuppassword;
//   successChange();
//   //point to the log in page
// }

// function successChange(){
//   passwordModal.innerHTML = '<p>Your password has been changed!</p>';
//   document.getElementById('changePWFooter').innerHTML = '<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>'
// }

// function changeProfilePic(e){
//   e.preventDefault();
//   var file = document.getElementById("myPic").files[0];
//   //upload the change to the server
//   document.getElementById("pic").src = file.name;

// }

