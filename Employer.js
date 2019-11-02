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
	constructor(name, openingTime){
		this.name = name
		this.employers = []
		this.employees = []
		this.openingTime = openingTime
	}
}
