'use strict';
/////////////////////////////
/// Event handlers
/////////////////////////////
function addNewCompany(e) {
    e.preventDefault()
    if (check()) {
        const company = new Company(
            document.querySelector('#name').value,
            new TimeInterval(document.querySelector('#openingTime').value, document.querySelector('#closingTime').value)
        )

        addCompany(company)
    }
}

function onDetailsClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn-info')) {
        const company = e.target.parentElement.parentElement
        const companyName = company.querySelectorAll('td')[0].innerHTML
        window.location.href = '/companyInfo?company=' + companyName;

    }
}


/////////////////////////////
/// API calls
/////////////////////////////

async function fetchAllCompanies() {
    const url = '/api/companies/all'
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

    return response.map(company => {
        const interval = new TimeInterval(company.openHours.start, company.openHours.end)
        return new Company(company.name, interval)
    })

}

async function addCompany(company) {
    const url = '/api/companies'

    const request = new Request(url, {
        method: 'POST',
        headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
        },
        body: JSON.stringify(company.toReqBody())
    })

    fetch(request)
    .then((res) => {
        if (res.ok) {
            addCompanyToCompanyTable(company)
        } else {
            alert('Add failed')
        }
    })


}

/////////////////////////////
/// DOM related
/////////////////////////////
function addCompanyToCompanyTable(company) {
    const table = document.querySelector('#companyTable')
    const tableRow = document.createElement('tr')

    const attributes = [
        company.name,
        company.openHours.start,
        company.openHours.end

    ];

    appendAllAttributesToRow(attributes, tableRow);

    appendButtonToRow(tableRow, 'details', ['btn', 'btn-info'], onDetailsClick);

    table.appendChild(tableRow)
}

function check() {
    let companyName = document.querySelector('#name').value
    let openTime = document.querySelector('#openingTime').value
    let closeTime = document.querySelector('#closingTime').value

    //empty inputs

    if ((companyName) === "") {
        alert("Please fill in the form")
        return false
    }
    if ((openTime) === "") {
        alert("Please fill in the form")
        return false
    }
    if ((closeTime) === "") {
        alert("Please fill in the form")
        return false
    }
    if ((openTime > 24) |(openTime) < 0 ){
        alert("Please enter valid opening Time")
        return false
    }

    if ((closeTime > 24) |(closeTime) < 0 ){
        alert("Please enter valid closing Time")
        return false
    }

    if (openTime >= closeTime){
        alert("Invalid Time Interval!")
        return false
    }

    return true
}

/////////////////////////////
/// component create methods
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
    const tableTextCells = att.map((att) => {
        const cell = document.createElement('td')
        const text = document.createTextNode(att)
        cell.appendChild(text)
        return cell
    });

    tableTextCells.map((cell) => {
        tableRow.appendChild(cell)
    });
}
/////////////////////////////
/// Init page
/////////////////////////////

function initPage() {
    const companyAddForm = document.getElementById('companyAddForm')
    const companyTable = document.getElementById('companyTable')
    companyAddForm.addEventListener('submit', addNewCompany)

    fetchAllCompanies().then(allCompanies => {
        allCompanies.forEach((e) => {
            addCompanyToCompanyTable(e)
        });
    })
}

document.addEventListener('DOMContentLoaded', initPage)
