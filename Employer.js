'use strict';

let allEmployers = []


class Employer {
	constructor(name, password, storeName, openTime, closeTime){
		this.name = name
		this.userID = allEmployers.length
		this.password = password
		this.storeName = storeName
		this.openTime = openTime
		this.closeTime = closeTime
	}
}