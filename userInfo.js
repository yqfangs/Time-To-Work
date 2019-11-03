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

        /// redirect to admin page
        window.location.href = 'admin.html'
    }
}

function saveUserInfo(e) {
    e.preventDefault();
    if (check()) {
        if (e.target.classList.contains('btn_save')) {
            const userInfo = document.querySelectorAll('#userInfo input')
            /// save user from database

            /// redirect to admin page
            window.location.href = 'admin.html'
        }
    }
}


/////////////////////////////
/// Replace with API calls
/////////////////////////////
function getCompanyObject() {
    const name = getUrlParameter('company')
    return allCompanies.find(c => name === c.name)
}

function getUserObject(company) {
    const id = getUrlParameter('id')
    const type = getUrlParameter('type')
    if (type === 'employerTable') {
        return company.employers.find(u => id == u.userID)
    } else if (type == 'employeeTable') {
        return company.employees.find(u => id == u.userID)
    }
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
    appendFixedInfo('ID: ', user.userID, container)
    appendEditableInfo('Name: ', user.name, container, 'name')
    appendEditableInfo('Password: ', user.password, container, 'password')
    appendEditableInfo('Email: ', user.email, container, 'email')
    appendFixedInfo('Company Name: ', user.companyName, container, 'companyName')
}

function displayEmployeeInfo(user) {
    const container = document.querySelector('.infoContainer')
    appendFixedInfo('ID: ', user.userID, container)
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
    let name = document.querySelector('#name').value
    let userEmail = document.querySelector('#email').value
    let userPhoneNum = document.querySelector('#phone').value
    let userPosition = document.querySelector('#position').value
    let userPwd = document.querySelector('#password').value

    //empty inputs

    if ((name && userEmail && userPhoneNum && userPosition && userPwd) === "") {
        alert("Please fill all the information")
        return false
    }

    // check correctness
    if (userEmail.indexOf('@') == -1) {
        document.getElementById("email").value = ""
        alert("Please enter valid email address")
        return false
    }

    if (userPhoneNum.length != 10) {
        alert("Please enter valid phone number")
        return false
    }
    return true
}

function checkEmployer() {
    let name = document.querySelector('#name').value
    let userEmail = document.querySelector('#email').value
    let userPwd = document.querySelector('#password').value

    //empty inputs

    if ((name && userEmail && userPwd) === "") {
        alert("Please fill all the information")
        return false
    }

    // check correctness
    if (userEmail.indexOf('@') == -1) {
        document.getElementById("email").value = ""
        alert("Please enter valid email address")
        return false
    }
    return true
}
/////////////////////////////
/// Init page
/////////////////////////////

const company = getCompanyObject()
displayUserInfo(getUserObject(company))

const btnDelete = document.querySelector('.btn_delete')
const btnSave = document.querySelector('.btn_save')
btnDelete.addEventListener('click', deleteUser)
btnSave.addEventListener('click', saveUserInfo)

