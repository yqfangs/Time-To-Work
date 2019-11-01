"use strict"
let allEmployers = [] // database fetch
let numOfEmployers = allEmployers.length
class Employer {
    constructor(First, Last, Email, PhoneNum, Company) {
        this.first = First
        this.last = Last
        this.email = Email
        this.phoneNum = PhoneNum
        this.company = Company
        this.password = '000000'

        this.employerId = numOfEmployers
        numOfEmployers++;
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

function getEmployerObject() {
    const id = getUrlParameter('id')
    return allEmployers.find(u => id == u.employerId)
}

function displayEmployerInfo(employer) {
    const employerInfo = document.querySelectorAll('#employerInfo input')
    const employerID = document.querySelector('#employerInfo span')
    employerID.innerHTML = employer.employerId
    employerInfo[0].value = employer.first
    employerInfo[1].value = employer.last
    employerInfo[2].value = employer.email
    employerInfo[3].value = employer.phoneNum
    employerInfo[4].value = employer.company
    employerInfo[5].value = employer.password
}

function deleteEmployer(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('btn_delete')) {
        const employer = getEmployerObject()
        /// delete employer from database

        /// redirect to admin page
        window.location.href = 'admin.html'
    }
}

function saveEmployerInfo(e) {
    e.preventDefault();
    
    if (e.target.classList.contains('btn_save')) {
        const employer = getEmployerObject()
        const employerInfo = document.querySelectorAll('#employerInfo input')
        console.log(employerInfo[0].value)
        employer.first 
        /// save employer from database

        /// redirect to admin page
        // window.location.href = 'admin.html'
    }
}





    /// mock data
    allEmployers.push(new Employer('Cindy', 'Lin', 'cindylin@gmail.com', '0000000000', 'Google'))
    allEmployers.push(new Employer('Jin', 'Lee', 'Jinlee@gmail.com', '1111111111', 'Amazon'))
    displayEmployerInfo(getEmployerObject())
    console.log(getEmployerObject())
    btnDelete.addEventListener('click', deleteEmployer)
    btnSave.addEventListener('click', saveEmployerInfo)

