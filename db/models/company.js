'use strict'

const mongoose = require('mongoose')
const { Employer } = require('./employer')
const { Employee, TimeInterval } = require('./employee')

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	employers: [String],
	employees: [String],
	// openHours: TimeInterval

})