'use strict'

const { Employer } = require('./db/models/employer.js')
const { Employee, TimeInterval } = require('./db/models/employee.js')

const MessageSchema = new mongoose.Schema({
	from: {
		type: String,
		required: true
	}
	to: {
		type: String,
		required: true
	}
	isTrade: {
		type: Boolean,
		required: true
	}

})

MessageSchema.extendWhen( { from:'employee' }, {
	employeeInfo: {
		type: Employee,
		required: true
	}
})

MessageSchema.extendWhen( { from:'employer' }, {
	employerInfo: {
		type: Employer,
		required: true
	}
})

MessageSchema.extendWhen( { isTrand: true }, {
	tradeTime: {
		type: TimeInterval,
		required: true
	}
})

MessageSchema.extendWhen( { isTrand: false }, {
	message: {
		type: String,
		required: true
	}
})