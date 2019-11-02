'use strict';

class Employer {
	constructor(name, password, email, phone, companyName){
		this.name = name
		this.password = password
		this.userID = allEmployers.length
		this.email = email
		this.phone = phone
		this.companyName = companyName
	}
}



class Company {
	constructor(name, openHours){
		this.name = name
		this.employers = []
		this.employees = []
		this.openHours = openHours	// a timeInterval object
	}


	/*
		This funciton finds the employee of the given name (string).
		Returns the corresponding employee object on success.
		Returns -1 if the employee of given name does not exist.
	*/
	function getEmployeeByName(name) {
		for (let empl of this.employees) {
			if (empl.name == name) {
				return empl
			}
		}
		return -1
	}


	/*
		This funciton finds the employee of the given id.
		Returns the corresponding employee object on success.
		Returns -1 if the employee of given id does not exist.
	*/
	function getEmployeeByID(id) {
		for (let empl of this.employees) {
			if (empl.id == id) {
				return empl
			}
		}
		return -1
	}


	/*
		This function removes the employee from the list of all employees
		given in the parameter.
		Returns the name of the employee on successful removal.
		Returns -1 on failed removal, i.e. not in this company
	*/
	function removeEmployee(employee) {
		const position = this.employees.indexOf(employee)
		if (position != -1) {
			this.employee.splice(position, 1)
			return employee.name
		}
		return -1
	}


	/*
		This funciton adds the employee to the list of all employees given
		in the parameter.
		Returns employee's name on success.
		Returns -1 when employee already in this company.
	*/
	function addEmployee(employee) {
		const position = this.employees.indexOf(employee)
		if (position == -1) {
			this.employees.push(employee)
			return employee.name
		}
		return -1
	}


	/*
		This function modifies the hours of operation
		Parameters must be numbers. Non-integers are rounded.
		Returns the new TimeInterval object on success.
		Returns -1 if parameters are not valid.
	*/
	function modifyHours(start, end) {
		const s = Math.round(Number(start))
		const e = Math.round(Number(end))
		if (s >= 0 && e <= 24 && s < e) {
			this.openHours = new TimeInterval(s, e)
			return this.openHours
		}
		return -1
	}
}
