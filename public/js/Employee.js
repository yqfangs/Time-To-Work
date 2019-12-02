'use strict';

const log = console.log

class Employee {
  constructor(name, password, email, position, phone, companyName) {
    this.name = name
    this.email = email
//    this.userID = allEmployees.length
    this.password = password
    this.position = position
    this.phone = phone
    this.companyName = companyName
    this.availability = []
    this.shifts = []
    this.messagesSend = []
    this.messagesRecived = []
  }

	toReqBody() {
		return {
			name: this.name,
			password: this.password,
			email: this.email,
      phone: this.phone,
      position: this.position,
			companyName: this.companyName
		}
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

/*
  This function converts the response json representative of Employee from
  server to a corresponding Employee object.
  Returns an employee object
*/
function convertToEmployee(json) {
  const emp = new Employee(json.name, json.password, json.email, json.position, json.phone, json.companyName)
  emp.availability = json.availability.map((int) => {
    return convertToTimeInterval(int)
  })
  emp.shifts = json.availability.map((int) => {
    return convertToTimeInterval(int)
  })

  emp.messagesSend = json.messagesSend;
  emp.messagesRecived = json.messagesRecived;
  return emp
}


class TimeInterval {
  constructor(start, end) {
    this.start = start
    this.end = end
    this.duration = end - start
  }

  toString() {
    return `${this.start} - ${this.end}`
  }
}

/*
  This function converts the response json representative of TimeInterval from
  server to a corresponding TimeInterval object.
*/
function convertToTimeInterval(json) {
  if (json.start && json.end) {
    return new TimeInterval(json.start, json.end)
  }
  else {
    return null
  }
}

// returns true if TimeInterval i1 contains i2, false otherwise
function compareIntervals(i1, i2) {
  return (i1.start <= i2.start && i1.end >= i2.end)
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


class employeeMessage {
  constructor(from, to, message, isTrade){
    this.from = from
    this.to = to
    this.message = message
    this.isTrade = false
    this.tradeTime = null
  }

  changeToTradeMessage(){
    this.isTrade = true
  }
}
