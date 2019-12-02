'use strict';
function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    let regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    let results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

/////////////////////////////
/// Event handlers
/////////////////////////////
function addNewEmployer(e) {
    e.preventDefault()
    if (check()) {
        const employer = new Employer(
            document.querySelector('#name').value,
            '000000',
            document.querySelector('#email').value,
            '1234567890',
            document.querySelector('#company').value,
        )
        
        addEmployer(employer)
    }
}

function onDetailsClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn-info')) {
        const tableName = e.target.parentElement.parentElement.parentElement.id
        const user = e.target.parentElement.parentElement
        const email = user.querySelector('#tdemail').innerHTML
        window.location.href = '/userInfo?email=' + email + '&type=' + tableName

    }
}

/////////////////////////////
/// component creation
/////////////////////////////
function appendButtonToRow(tableRow, buttonText, buttonClasses, onClick) {
    const cell = document.createElement('td')
    const but = document.createElement('button')
    for (let c in buttonClasses) {
        but.classList.add(buttonClasses[c])
    }
    but.onclick = onClick;
    const butText = document.createTextNode(buttonText)
    but.appendChild(butText)
    cell.appendChild(but)
    tableRow.appendChild(cell)
}

function appendAllAttributesToRow(att, tableRow) {
    const tableTextCells = Object.keys(att).map((key) => {
        const cell = document.createElement('td')
        cell.id = 'td' + key
        const text = document.createTextNode(att[key])
        cell.appendChild(text)
        return cell
    });

    tableTextCells.map((cell) => {
        tableRow.appendChild(cell)
    });
}


/////////////////////////////
/// DOM related
/////////////////////////////
function addEmployerToEmployerTable(employer) {
    const table = document.querySelector('#employerTable')
    const tableRow = document.createElement('tr')

    const attributes = 
        (({userID, name, email, companyName, ..._}) => {
       return {userID, name, email, companyName}
    })(employer)

    appendAllAttributesToRow(attributes, tableRow);

    appendButtonToRow(tableRow, 'modify info', ['btn','btn-info'], onDetailsClick);

    table.appendChild(tableRow)
}

function addEmployeeToEmployeeTable(employee) {
    const table = document.querySelector('#employeeTable')
    const tableRow = document.createElement('tr')

    const attributes = 
    (({userID, name, email, position, phone, companyName, ..._}) => {
   return {userID, name, email, position, phone, companyName}
    })(employee)
    
    appendAllAttributesToRow(attributes, tableRow)

    appendButtonToRow(tableRow, 'modify info', ['btn','btn-info'], onDetailsClick);

    table.appendChild(tableRow)
}

function check() {
    let employerName = document.querySelector('#name').value
    let employerEmail = document.querySelector('#email').value
    let employerCompany = document.querySelector('#company').value

    //empty inputs

    if ((employerName && employerEmail && employerCompany) === "") {
        alert("Please fill in the form")
        return false
    }

    // check correctness
    if (employerEmail.indexOf('@') == -1) {
        document.getElementById("email").value = ""
        alert("Please enter valid email address")
        return false
    }
    return true
}

/////////////////////////////
/// API calls
/////////////////////////////

async function addEmployer(employer) {
    const url = '/api/employers'

    const request = new Request(url, {
        method: 'POST',
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(employer.toReqBody())
    })

    fetch(request)
    .then((res) => {
        if (res.ok) {   
            addEmployerToEmployerTable(employer)
        } else {
            alert('Add failed')
        }
    })
}

async function fetchEmployees() {

    const name = getUrlParameter('company')
    const url = '/api/employees/by_company/' + name
    const request = new Request(url, {
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          }
    })
  
    const response = await fetch(request)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error)
            alert('Fetch is unsuccessful.')
        })

    return response.map(employee => new Employee(
        employee.name, 
        employee.password, 
        employee.email, 
        employee.position, 
        employee.phone, 
        employee.companyName))
}

async function fetchEmployers() {

    const name = getUrlParameter('company')
    const url = '/api/employers/by_company/' + name
    const request = new Request(url, {
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
          }
    })
  
    const response = await fetch(request)
        .then((res) => res.json())
        .catch((error) => {
            console.log(error)
            alert('Fetch is unsuccessful.')
        })

    return response.map(employer => new Employer(
        employer.name, 
        employer.password, 
        employer.email, 
        employer.phone, 
        employer.companyName))
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
/// Init page
/////////////////////////////


function initPage() {
    const employerAddForm = document.getElementById('employerAddForm')
    const employerTable = document.getElementById('employerTable')
    employerAddForm.addEventListener('submit', addNewEmployer)

    fetchEmployees().then(employees => {
        employees.forEach((e) => {
            addEmployeeToEmployeeTable(e)
        });
    })

    fetchEmployers().then(employers => {
        employers.forEach((e) => {
            addEmployerToEmployerTable(e)
        });
    })
}

document.addEventListener('DOMContentLoaded', initPage)
