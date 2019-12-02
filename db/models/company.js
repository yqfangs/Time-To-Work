'use strict'

const mongoose = require('mongoose')
const {TimeIntervalSchema} = require('./timeInterval')

const CompanySchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		minlegth: 1,
		trim: true
	},
	openHours: TimeIntervalSchema
})

const Company = mongoose.model('Company', CompanySchema)
module.exports = { Company }
