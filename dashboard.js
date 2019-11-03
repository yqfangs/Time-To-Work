'use strict';
const log = console.log;

/*
const allEmployees = []
const allEmployers = []
const dayId = ['MondayTime', 'TuesdayTime','WednesdayTime', 'ThursdayTime', 'FridayTime', 'SaturdayTime', 'SundayTime'];

// -------------- setting up mock info ----------------

const alice = new Employee('Alice', '123', 'alice@mail.com', 'waitress', '121345678', 'company1');
const bob = new Employee('Bob', '123', 'bob@mail.com', 'cook', '123456798', 'company2');
const caitlyn = new Employee('Caitlyn', '123', 'caitlyn@mail.com', 'cook', '1236879089', 'company1');
const darius = new Employee('Darius', '123', 'darius@mail.com', 'supervisor', '7896751673', 'company1');

const employer1 = new Employer('employer1', '123', 'employer1@mail.com', '123567989', 'company1');

allCompanies.push(new Company('company1', new TimeInterval(8, 24)))
allCompanies.push(new Company('company2', new TimeInterval(9, 22)))

allEmployees.push(alice);
allEmployees.push(bob);
allEmployees.push(caitlyn);
allEmployees.push(darius);

allEmployers.push(employer1);

alice.getCompany().employees.push(alice);
bob.getCompany().employees.push(bob);
caitlyn.getCompany().employees.push(caitlyn);
darius.getCompany().employees.push(darius);

employer1.getCompany().employers.push(employer1);
*/



// declared and loaded when loggin in
// const current_user = allEmployers[0]; //store the current user log in id



/*
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
*/

const scheduleTable = document.querySelector('#WeeklyScheduleTable');
const hourTable = document.querySelector('#WorkingHourTable');
const sidebar = document.querySelector('#sidebar');
window.addEventListener('load', modifySideBar(current_user));
window.addEventListener("load", loadSchedule(current_user));
window.addEventListener('load', loadHourTable(current_user));

function loadSchedule(user){
	const companyEmployee = user.getCompany().employees;
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
