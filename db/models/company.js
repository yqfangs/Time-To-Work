'use strict'

const { Employer } = require('./db/models/employer.js')
const { Employee, TimeInterval } = require('./db/models/employee.js')

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	employers: [Employer],
	employees: [Employee],
	openHours: [TimeInterval]

})