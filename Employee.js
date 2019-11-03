'use strict';


class Employee {
  constructor(name, password, email, position, phone, companyName) {
    this.name = name
    this.email = email
    this.userID = allEmployees.length
    this.password = password
    this.position = position
    this.phone = phone
    this.companyName = companyName
    this.availability = []
    this.shifts = []
  }

  /*
    This function returns the company object with name equal to the
    companyName attribute.
    Returns -1 if such a company does not exist
  */
  getCompany() {
  	for(let comp of allCompanies){
  		if(comp.name == this.companyName){
  			return comp
  		}
  	}
  	return -1
  }
}


class TimeInterval {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.duration = end - start
  }
}

// returns true if TimeInterval i1 contains i2, false otherwise
function compareIntervals(i1, i2) {
  return (i1.start <= i2.start && i1.end >= i2.end)
}


// returns if the start and end time are valid for an interval (call before creating the interval)
function checkStartEnd(s, e) {
  if (s >= 8 && e <= 24 && s < e) {
    return true
  }
  return false
}


// returns the total number of hours in an array of Intervals
function totalHours(intArray) {
  let sum = 0
  for (const interval of intArray) {
    if (interval != null) {
      sum += interval.duration
    }
  }
  return sum
}
