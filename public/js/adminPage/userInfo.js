"use strict"

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

/////////////////////////////
/// Event handlers
/////////////////////////////
function deleteUser(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn_delete')) {
        /// delete user from database
        const email = getUrlParameter('email')
        updateUser({email: email}, "DELETE").then(
            res => {
                if (res.ok) window.location.href = '/admin'
                else alert('Delete failed')
            }
        )
    }
}

function saveUserInfo(e) {
    e.preventDefault();
    if (check()) {
        if (e.target.classList.contains('btn_save')) {

            const type = getUrlParameter('type')
            const user = {}
            user.name = document.querySelector(('#name')).value
            user.email = document.querySelector(('#email')).value
            user.phone = document.querySelector(('#phone')).value
            if (type === 'employeeTable') {
                user.position = document.querySelector(('#position')).value
                user.phone = document.querySelector(('#phone')).value
            }
            if (document.querySelector(('#password')).value !== "") {
                user.password = document.querySelector(('#password')).value
            }

            updateUser(user, "SAVE").then(
                res => {
                    if (res.ok) window.location.href = '/admin'
                    else alert('Save failed')
                }
            )
        }
    }
}

function logOut(e) {
    if (e.target.classList.contains('logout')){
        window.location.href="/employee/logout"
    }
}


/////////////////////////////
/// API calls
/////////////////////////////
async function updateUser(user, mode) {
    const type = getUrlParameter('type')
    const email = getUrlParameter('email')
    const url =  (type === 'employerTable') ? 
        '/api/employers/email/' +  email : 
        '/api/employees/email/' +  email
    console.log(url)

    const request = new Request(url, {
        method: 'PATCH',
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(
            {   
                mode: mode,
                user: user
            }
        )
    })

    return fetch(request)
}

function fetchUser() {
    const email = getUrlParameter('email')
    const type = getUrlParameter('type')
    if (type === 'employerTable') {
        return fetchEmployer(email)
    } else if (type == 'employeeTable') {
        return fetchEmployee(email)
    }
}

async function fetchEmployer(email) {
    const url = '/api/employers/email/' + email
    const request = new Request(url, {
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          }
    })
  
    const employer = await fetch(request)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error)
            alert('Fetch is unsuccessful.')
        })

    return new Employer(
        employer.name, 
        "", 
        employer.email, 
        employer.phone, 
        employer.companyName)
}

async function fetchEmployee(email) {
    const url = '/api/employees/email/' + email
    const request = new Request(url, {
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          }
    })
  
    const employee = await fetch(request)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error)
            alert('Fetch is unsuccessful.')
        })

    return new Employee(
        employee.name, 
        "", 
        employee.email, 
        employee.position, 
        employee.phone, 
        employee.companyName)
}

/////////////////////////////
/// component creation
/////////////////////////////
function appendFixedInfo(attName, att, container) {
    const info = document.createElement('p')
    const infoName = document.createTextNode(attName)
    info.appendChild(infoName)

    const span = document.createElement('span')
    span.innerHTML = att

    info.appendChild(span)
    container.appendChild(info)
}

function appendEditableInfo(attName, att, container, id) {
    const info = document.createElement('p')
    const infoName = document.createTextNode(attName)
    info.appendChild(infoName)

    const input = document.createElement('input')
    if (typeof id !== 'undefined') {
        input.id = id
    }
    input.value = att

    info.appendChild(input)
    container.appendChild(info)
}

/////////////////////////////
/// DOM related
/////////////////////////////
function displayUserInfo(user) {
    const type = getUrlParameter('type')
    if (type === 'employerTable') {
        displayEmployerInfo(user)
    } else if (type == 'employeeTable') {
        displayEmployeeInfo(user)
    }
}

function displayEmployerInfo(user) {
    const container = document.querySelector('.infoContainer')
    appendEditableInfo('Name: ', user.name, container, 'name')
    appendEditableInfo('Password: ', user.password, container, 'password')
    appendEditableInfo('Phone: ', user.phone, container, 'phone')
    appendEditableInfo('Email: ', user.email, container, 'email')
    appendFixedInfo('Company Name: ', user.companyName, container, 'companyName')
}

function displayEmployeeInfo(user) {
    const container = document.querySelector('.infoContainer')
    appendEditableInfo('Name: ', user.name, container, 'name')
    appendEditableInfo('Password: ', user.password, container, 'password')
    appendEditableInfo('Email: ', user.email, container, 'email')
    appendEditableInfo('Position: ', user.position, container, 'position')
    appendEditableInfo('Phone: ', user.phone, container, 'phone')
    appendFixedInfo('Company Name: ', user.companyName, container, 'companyName')
}

function check() {
    const type = getUrlParameter('type')
    if (type === 'employerTable') {
        return checkEmployer()
    } else if (type == 'employeeTable') {
        return checkEmployee()
    }
    return true
}

function checkEmployee() {
    let positions = ["waiter", "waitress", "cook", "supervisor", "cashier"]
    let name = document.querySelector('#name').value
    let userEmail = document.querySelector('#email').value
    let userPhoneNum = document.querySelector('#phone').value
    let userPosition = document.querySelector('#position').value
    let userPwd = document.querySelector('#password').value

    //empty inputs

    if ((name && userEmail && userPhoneNum && userPosition) === "") {
        alert("Please fill all the information")
        return false
    }

    if (userPwd !== "" & userPwd.length != 6) {
        alert("Enter valid password")
        return false
    }


    // check correctness
    if (userEmail.indexOf('@') == -1) {
        document.getElementById("email").value = ""
        alert("Please enter valid email address")
        return false
    }

    if (positions.includes(userPosition) === false){
        alert("Please enter valid position {waiter, waitress, cook, supervisor, cashier}")
        return false
    }
    return true
}

function checkEmployer() {
    let name = document.querySelector('#name').value
    let userEmail = document.querySelector('#email').value
    let userPwd = document.querySelector('#password').value
    let userPhoneNum = document.querySelector('#phone').value

    //empty inputs

    if ((name && userEmail) === "") {
        alert("Please fill all the information")
        return false
    }

    if (userPwd !== "" & userPwd.length != 6) {
        alert("Enter valid password (length of 6)")
        return false
    }

    // check correctness
    if (userEmail.indexOf('@') == -1) {
        document.getElementById("email").value = ""
        alert("Please enter valid email address")
        return false
    }
    
    if(userPhoneNum.length !== 10) {
        alert("Please enter valid phone number")
        return false
    }
    return true
}
/////////////////////////////
/// Init page
/////////////////////////////

function initPage() {
    const btnDelete = document.querySelector('.btn_delete')
    const btnSave = document.querySelector('.btn_save')
    const logout = document.querySelector('.logout')
    btnDelete.addEventListener('click', deleteUser)
    btnSave.addEventListener('click', saveUserInfo)
    logout.addEventListener('click', logOut)

    fetchUser().then(user => displayUserInfo(user))
}

document.addEventListener('DOMContentLoaded', initPage)



