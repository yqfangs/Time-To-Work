'use strict';
const log = console.log;

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

        allCompany.push(company)

        addCompanyToCompanyTable(company)
    }
}

function onDetailsClick(e) {
    e.preventDefault();

    if (e.target.classList.contains('btn-info')) {
        const company = e.target.parentElement.parentElement
        const companyName = company.querySelectorAll('td')[0].innerHTML
        window.location.href = 'companyInfo.html?company=' + companyName;

    }
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

    appendButtonToRow(tableRow, 'modify info', 'btn-info', onDetailsClick);

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
function appendButtonToRow(tableRow, buttonText, buttonClass, onClick) {
    const cell = document.createElement('td')
    const but = document.createElement('button')
    but.classList.add(buttonClass)
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
const companyAddForm = document.getElementById('companyAddForm')
const companyTable = document.getElementById('companyTable')
companyAddForm.addEventListener('submit', addNewCompany)

allCompanies.map((e) => {
    addCompanyToCompanyTable(e)
});
