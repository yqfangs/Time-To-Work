'use strict';
const log = console.log;

let allUsers = []
let numOfUsers = allUsers.length
class User {
    constructor(First, Last, Email, PhoneNum, Company, Type) {
        this.first = First
        this.last = Last
        this.email = Email
        this.phoneNum = PhoneNum
        this.company = Company
        this.type = Type
        this.password = '000000'

        this.userId = numOfUsers
        numOfUsers++;
    }
}
const employerAddForm = document.getElementById('employerAddForm')
const userTable = document.getElementById('userTable')
console.log(document.getElementById('employerAddForm'))
employerAddForm.addEventListener('submit', addNewEmployer)

function addNewEmployer(e) {
    e.preventDefault()
    if (check()) {
        const user = new User(
            document.querySelector('#firstName').value,
            document.querySelector('#lastName').value,
            document.querySelector('#email').value,
            document.querySelector('#phoneNum').value,
            document.querySelector('#company').value,
            'Employer'
        )

        allUsers.push(user)

        addUserToUserTable(user)
    }
}

function onDetailsClick(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('checkInfoBut')) {
        const user = e.target.parentElement.parentElement
		const userId = user.querySelectorAll('td')[0].innerHTML
        window.location.href='userInfo.html?id='+userId;
        
    }
}

function addUserToUserTable(user) {
    console.log(user)
    const table = document.getElementById('userTable')
    const tableRow = document.createElement('tr')

    const userId = document.createElement('td')
    const userFirst = document.createElement('td')
    const userLast = document.createElement('td')
    const userEmail = document.createElement('td')
    const userPhone= document.createElement('td')
    const userCompany = document.createElement('td')
    const userType = document.createElement('td')
    const userInfo = document.createElement('td')

    const userIdText = document.createTextNode(user.userId)
    const userFnText = document.createTextNode(user.first)
    const userLnText = document.createTextNode(user.last)
    const userEmailText = document.createTextNode(user.email)
    const userPhoneText = document.createTextNode(user.phoneNum)
    const userCompanyText = document.createTextNode(user.company)
    const userTypeText = document.createTextNode(user.type)
    const userInfoBut = document.createElement('button')
    userInfoBut.classList.add('checkInfoBut')
    userInfoBut.onclick = onDetailsClick;
    const butText = document.createTextNode('modify info')

    userInfoBut.appendChild(butText)
    userId.appendChild(userIdText)
    userFirst.appendChild(userFnText)
    userLast.appendChild(userLnText)
    userEmail.appendChild(userEmailText)
    userPhone.appendChild(userPhoneText)
    userCompany.appendChild(userCompanyText)
    userType.appendChild(userTypeText)
    userInfo.appendChild(userInfoBut)

    tableRow.appendChild(userId)
    tableRow.appendChild(userFirst)
    tableRow.appendChild(userLast)
    tableRow.appendChild(userEmail)
    tableRow.appendChild(userPhone)
    tableRow.appendChild(userCompany)
    tableRow.appendChild(userType)
    tableRow.appendChild(userInfo)

    table.appendChild(tableRow)
    log(userInfoBut.parentNode.parentNode.firstChild.textContent)
}

function check() {
    var firstName = document.querySelector('#firstName').value
    var lastName = document.querySelector('#lastName').value
    var userEmail = document.querySelector('#email').value
    var userPhoneNum = document.querySelector('#phoneNum').value
    var userCompany = document.querySelector('#company').value

    //empty inputs

    if ((firstName && lastName && userEmail && userPhoneNum && userCompany) == "") {
        alert("Please fill in the form")
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
     

    // if (userType != "Employee" && userType != "User") {
    //     alert("Please enter the correct type")
    //     return false
    // }

    return true
}

/// mock data
allUsers.push(new User('Cindy', 'Lin', 'cindylin@gmail.com', '0000000000', 'Google', 'Employee'))
allUsers.push(new User('Jin', 'Lee', 'Jinlee@gmail.com', '1111111111', 'Amazon', 'Employee'))
addUserToUserTable(allUsers[0])
addUserToUserTable(allUsers[1])