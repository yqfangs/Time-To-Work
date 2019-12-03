'use strict';

let currentUser = null;
const dayId = ['MondayTime', 'TuesdayTime','WednesdayTime', 'ThursdayTime', 'FridayTime', 'SaturdayTime', 'SundayTime'];


const scheduleTable = document.querySelector('#WeeklyScheduleTable');
const hourTable = document.querySelector('#WorkingHourTable');
const sidebar = document.querySelector('#sidebar');
// window.addEventListener('load', modifySideBar);
// window.addEventListener("load", loadSchedule);

window.addEventListener('load', loadCurrentUser);
//window.addEventListener("load", loadColleagues);
//window.addEventListener('load', loadHourTable;

function loadCurrentUser(){
  // load personal info from server
    const url = '/api/dashboard'
    fetch(url)
    .then((res) => {
        if (res.status === 200) {
            return res.json()
        }else{
            alert('could not get user')
        }
    })
    .then((json) => {
    	if(json.type == "employer"){
    		currentUser = convertToEmployer(json.employer)
    	}else if(json.type == "employee"){
    		currentUser = convertToEmployee(json.employee)
    	}
        loadSchedule();
        loadHourTable();
        modifySideBar(currentUser)
    })
    .catch((error) => {
    	log(error)
    	alert('Fail loading the user')
    })
}

function loadSchedule(){
  const url = '/api/employees/by_company/' + currentUser.companyName
  fetch(url)
  .then((res) => {
  	if (res.status === 200) {
  		return res.json()
  	}else{
  		alert('Fail loading all employees')
  	}
  }).then((json) => {
  	log(json)
  	const companyEmployee = json
  	for(var i = 0; i < companyEmployee.length; i++){
		const row = document.createElement('tr');
		const rowHead = document.createElement('th');
		rowHead.setAttribute('scope', 'row');
		rowHead.appendChild(document.createTextNode(companyEmployee[i].name));
		row.appendChild(rowHead);
		for(var j = 0; j < 7; j++){
			const tableData = document.createElement('td');
			tableData.id = dayId[j];
			tableData.className = 'dayCell';
			const shift = companyEmployee[i].shifts[j];
			if(shift.start != undefined && shift.end != undefined){
			tableData.appendChild(document.createTextNode(`${shift.start}-${shift.end}`));
			}
			row.appendChild(tableData);
		}
		scheduleTable.appendChild(row);
	}
  })
}

function loadHourTable(){
	if(currentUser instanceof Employer){
		const schedulebox = document.querySelector('#workinghour');
		schedulebox.style.visibility = "hidden";
	}else{
		const row = document.createElement('tr');
	const rowHead = document.createElement('th');
	rowHead.setAttribute('scope', 'row');
	rowHead.appendChild(document.createTextNode('Hour'));
	row.appendChild(rowHead);
	let total = 0;
	for(var i = 0; i < 7; i++){
		const tableData = document.createElement('td');
		tableData.id = dayId[i];
		tableData.className = 'dayCell';
		const shift = currentUser.shifts[i];
		if(shift != null ){
			total += shift.duration;
			tableData.appendChild(document.createTextNode(shift.duration));
		}
		row.appendChild(tableData);
	}
	const totalData = document.createElement('td');
	totalData.id = 'TotalHour';
	totalData.className = 'dayCell';
	totalData.appendChild(document.createTextNode(total));
	row.appendChild(totalData);

	hourTable.appendChild(row);

	}
}
