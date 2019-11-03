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
