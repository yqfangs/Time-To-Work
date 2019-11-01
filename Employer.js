'use strict';

class Employer {
	constructor(name, password, email, companyName){
		this.name = name
		this.password = password
		this.userID = allEmployers.length
		this.email = email
		this.companyName = companyName
	}
}
class Company {
	constructor(name, openingTime){
		this.name = name
		this.employers = []
		this.employees = []
		this.openingTime = openingTime
	}
}
