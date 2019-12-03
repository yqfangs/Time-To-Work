'use strict';

class Employer {
	constructor(name, password, email, phone, companyName){
		this.name = name
		this.password = password
		// this.userID = allEmployers.length
		this.email = email
		this.phone = phone
		this.companyName = companyName
    this.messagesSend = []
    this.messagesRecived = []
	}

	toReqBody() {
		return {
			name: this.name,
			password: this.password,
			email: this.email,
			phone: this.phone,
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

function convertToEmployer(json) {
  const emp = new Employer(json.name, json.password, json.email, json.position, json.phone, json.companyName)
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


class employerMessage {
  constructor(from, to, message){
    this.from = from
    this.to = to
    this.message = message
  }

}
