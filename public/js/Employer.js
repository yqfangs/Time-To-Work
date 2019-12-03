'use strict';

class Employer {
	constructor(name, password, email, phone, companyName){
		this.name = name
		this.password = password
		// this.userID = allEmployers.length
		this.email = email
		this.phone = phone
		this.companyName = companyName
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



/*
  This function converts the response json representative of Employee from
  server to a corresponding Employee object.
  Returns an employee object
*/
function convertToEmployer(json) {
  const emp = new Employer(json.name, json.password, json.email, json.phone, json.companyName)
  return emp
}
