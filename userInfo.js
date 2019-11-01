"use strict"
let allUsers = [] // database fetch
let numOfUsers = allUsers.length
class User {
    constructor(First, Last, Email, PhoneNum, type) {
        this.first = First
        this.last = Last
        this.email = Email
        this.phoneNum = PhoneNum
        this.type = type
        this.password = '000000'

        this.userId = numOfUsers
        numOfUsers++;
    }
}
const btnDelete = document.querySelector('.btn_delete')
const btnSave = document.querySelector('.btn_save')
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function getUserObject() {
    const id = getUrlParameter('id')
    return allUsers.find(u => id == u.userId)
}

function displayUserInfo(user) {
    const userInfo = document.querySelectorAll('#userInfo input')
    const userID = document.querySelector('#userInfo span')
    userID.innerHTML = user.userId
    userInfo[0].value = user.first
    userInfo[1].value = user.last
    userInfo[2].value = user.email
    userInfo[3].value = user.phoneNum
    userInfo[4].value = user.type
    userInfo[5].value = user.password
}

function deleteUser(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('btn_delete')) {
        const user = getUserObject()
        /// delete user from database

        /// redirect to admin page
        window.location.href = 'admin.html'
    }
}

function saveUserInfo(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('btn_save')) {
        const user = getUserObject()
        const userInfo = document.querySelectorAll('#userInfo input')
        console.log(userInfo[0].value)
        user.first 
        /// save user from database

        /// redirect to admin page
        // window.location.href = 'admin.html'
    }
}





    /// mock data
    allUsers.push(new User('Cindy', 'Lin', 'cindylin@gmail.com', '0000000000', 'Employer'))
    allUsers.push(new User('Jin', 'Lee', 'Jinlee@gmail.com', '1111111111', 'Employee'))
    displayUserInfo(getUserObject())
    console.log(getUserObject())
    btnDelete.addEventListener('click', deleteUser)
    btnSave.addEventListener('click', saveUserInfo)

