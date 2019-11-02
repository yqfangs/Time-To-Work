'use strict';
const log = console.log;

const allEmployees = []
const allEmployers = []
const dayId = ['MondayTime', 'TuesdayTime','WednesdayTime', 'ThursdayTime', 'FridayTime', 'SaturdayTime', 'SundayTime'];

// class Employee {
//   constructor(name, password, company, position, phone) {
//     this.name = name
//     this.userID = allEmployees.length
//     this.password = password
//     this.company = company
//     this.position = position
//     this.phone = phone
//     this.availability = []
//     this.shifts = []
//   }
// }

// class TimeInterval {
//   constructor(start, end) {
//     this.start = start
//     this.end = end
//     this.duration = end - start
//   }
// }

//import {Employer, Company} from './Employer.js';
// -------------- setting up mock info ----------------

allEmployees.push(new Employee('Alice', '123', 'alice@mail.com', 'waitress', '121345678'));
allEmployees.push(new Employee('Bob', '123', 'bob@mail.com', 'cook', '123456798'));
allEmployees.push(new Employee('Caitlyn', '123', 'caitlyn@mail.com', 'cook', '1236879089'));
allEmployees.push(new Employee('Darius', '123', 'darius@mail.com', 'supervisor', '7896751673'));

allEmployers.push(new Employer('employer1', '123', 'employer1@mail.com', 'company1'));

const current_user = allEmployees[0]; //store the current user log in id
console.log(allEmployers[0]);

for (let i = 0; i < 7; i++) {
  allEmployees[0].availability.push(new TimeInterval(8, 15))
  allEmployees[1].availability.push(new TimeInterval(9, 16))
  allEmployees[2].availability.push(new TimeInterval(8, 15))
  allEmployees[3].availability.push(new TimeInterval(9, 16))
}

allEmployees[0].shifts[0] = new TimeInterval(8, 15)
allEmployees[0].shifts[2] = new TimeInterval(12, 20)
allEmployees[0].shifts[3] = new TimeInterval(9, 17)
allEmployees[0].shifts[6] = new TimeInterval(16, 24)
allEmployees[1].shifts[1] = new TimeInterval(9, 16) //Alice and Bob has scheduled work shifts

const scheduleTable = document.querySelector('#WeeklyScheduleTable');
const hourTable = document.querySelector('#WorkingHourTable');
const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));
window.addEventListener("load", loadSchedule);
window.addEventListener('load', loadHourTable(current_user));

function modifySideBar(user){
	if(user instanceof Employee){

	}else if(user instanceof Employer){

	}

}

function loadSchedule(){
	for(var i = 0; i < allEmployees.length; i++){
		const row = document.createElement('tr');
		const rowHead = document.createElement('th');
		rowHead.setAttribute('scope', 'row');
		rowHead.appendChild(document.createTextNode(allEmployees[i].name));
		row.appendChild(rowHead);
		for(var j = 0; j < 7; j++){
			const tableData = document.createElement('td');
			tableData.id = dayId[j];
			tableData.className = 'dayCell';
			const shift = allEmployees[i].shifts[j];
			if(shift != undefined){
			tableData.appendChild(document.createTextNode(`${shift.start}-${shift.end}`));
			}
			row.appendChild(tableData);
		}
		scheduleTable.appendChild(row);
	}

}

function loadHourTable(user){
	if(user instanceof Employer){
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
		const shift = user.shifts[i];
		if(shift != undefined){
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