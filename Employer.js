'use strict';

const allEmployers = []
const allEmployees = []

class TimeInterval {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.duration = end - start
  }
}

class Employer {
	constructor(name, password, email, companyName){
		this.name = name
		this.userID = allEmployers.length
		this.email = email
		this.password = password
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