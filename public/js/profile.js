  'use strict';
  // const allEmployees = []
  // const allEmployers = []

  let currentUser = null
  const changePW = document.querySelector('#personalInfo');
  changePW.addEventListener('click', requestChangePassword);

  const newPW = document.querySelector('#newPasswordForm');
  const pwSubmit = document.querySelector('#changePWSubmit');
  pwSubmit.addEventListener('click', checkPwMatch);
  const pwBack = document.querySelector('#pwBack');
  pwBack.addEventListener('click', refresh);

  const passwordModal = document.querySelector('#passwordBody');
  const modal = document.querySelector('#modal');

  const uploadPicture = document.querySelector('#uploadPicture');
  //uploadPicture.addEventListener('submit', changeProfilePic);

  const sidebar = document.querySelector('#sidebar');
  window.addEventListener('load', modifySideBar(currentUser));

  const personalInfo = document.querySelector('#personalInfo');
  window.addEventListener('load', loadPersonalInfo);
  window.addEventListener('load', loadProfilePic);

  function loadPersonalInfo(e){
      log("imhere")
    // load personal info from server
      const url = '/api/profile'
      fetch(url)
      .then((res) => {
          if (res.status === 200) {
              return res.json()
          }else{
              alert('could not get employee')
          }
      })
      .then((json) => {
      if(json.type == "employer"){
        currentUser = convertToEmployer(json.employer)
      }else if(json.type == "employee"){
        currentUser = convertToEmployee(json.employee)
      }
          modifySideBar(currentUser)
          const userInfo = [currentUser.name, currentUser.email, currentUser.phone, currentUser.companyName, currentUser.position];
          if(userInfo[4] == undefined){
            userInfo[4] = "Employer"
          }
          const infoList = personalInfo.children;
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
          log(error)
      })
    
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
    var password = document.getElementById("newPassword").value;
    var confirmpw = document.getElementById("cnewPassword").value;

    if(password == null || password == ""){
      alert("Please enter your password");
      return false;
    }
    if(confirmpw == null || confirmpw == ""){
      alert("Please enter your confirm password");
      return false;
    }
    //password not match
    if(password != confirmpw){
      document.getElementById("newPassword").value = "";
      document.getElementById("cnewPassword").value = "";
      alert("Please make sure your password and confirm password are matching");
      return false;
    }
    const data = {
        password: password
    }

    //upload the change to the server
    const url = '/api/profile'
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
        if(res.status === 200){
            successChange();
        }else{
            failChange();
        }
    })
    //point to the log in page
  }

  function successChange(){
    passwordModal.innerHTML = '<div style="text-align:center"><p>Your password has been changed! <br> You will be redirect to login page in 3 seconds</p></div>';
    const footer = document.getElementById('changePWFooter')
    // footer.style.visibility = "hidden";
    modal.removeChild(footer)
    const url = '/employee/logout'
    fetch(url)
    .then((res) => {
        //alert("Please log in again.")
        const autoRedirect = new Promise((resolve, reject) => {
            setTimeout(() => {
                window.location.href = "/login";
                resolve('redirect to login')
            }, 3000)
        });
        autoRedirect.then((message) => {
            log('Resolve function:', message)
        }, (error) => {
            log('Reject function:', error)
        });
    }).catch(error=>{
        log(error)
    })
  }

  function failChange(){
    passwordModal.innerHTML = '<p>Unable to change you password, please try again later.</p>';
    const children = document.getElementById('changePWFooter').children
    const submit = children[0].firstElementChild
    children[0].removeChild(submit)
  }

  function refresh(){
    window.location.reload()
  }

  function loadProfilePic(e){
    e.preventDefault();
    const url = '/api/upload'
    fetch(url)
    .then((res) => {
        if(res.status === 200){
            return res.json()
        }else{
            log('error')
        }
    })
    .then((json) =>{
        document.getElementById("pic").src = json.path;
    })
    // const file = document.getElementById("myPic").files[0];
    // // //upload the change to the server

  }

