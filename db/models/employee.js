/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const {TimeIntervalSchema} = require('./timeInterval')
const log = console.log
const ObjectId = mongoose.ObjectId

const SALT_FACTOR = 10

// ----------- Schema for message -----------
const MessageEmployeeSchema = new mongoose.Schema({
	from: { //email address
		type: String,
		required: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	},
	to: { //email address
		type: String,
		required: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	},
	isTrade: {
		type: Boolean,
		required: true,
		default: false
	},
	tradeTime: {
		type: TimeIntervalSchema
	},
	tradeWeekDay: Number,
	message: {
		type: String
	},
	tradeResponse: {
		type: String,
		default: 'W' //'W' = wait 'A' = accpet 'D' = 'decline'
	}

})



// ----------- Schema for employee -----------
const EmployeeSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlegth: 1,
		trim: true
	},
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true,
		unique: true,
		validate: {
			validator: validator.isEmail,   // custom validator
			message: 'Not valid email'
		}
	},
	password: {
		type: String,
		required: true,
		minlength: 6,
		maxlength: 100
	},
	position: {
		type: String,
		required: true
	},
	phone:{
		type: String,
		required: true,
		minlength: 10,
		trim: true,
	},
	companyName:{
		type: String,
		required: true,
		minlength: 1,
		trim: true,
	},
	availability:[TimeIntervalSchema],
	shifts:[TimeIntervalSchema],
	messages: [MessageEmployeeSchema]
})

EmployeeSchema.pre('save', function(next) {
	const employee = this; // binds this to employee document instance

	//only hash again if we modify/ its new
	if (employee.isModified('password')) {
		bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
			bcrypt.hash(employee.password, salt, (err, hash) => {
				employee.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

EmployeeSchema.pre('findOneAndUpdate', function(next) {
	const update = this.getUpdate();
	if (update.password) {
		bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
		bcrypt.hash(update.password, salt, (err, hash) => {
			this.getUpdate().password = hash;
			next();
		})
	})
	} else {
		next();
	}
})


EmployeeSchema.statics.findByEmailPassword = function(email, password) {
	const Employee = this

	return Employee.findOne({ email: email }).then((employee) => {
		if (!employee) {
			return employee
			//return Promise.reject("No matching email")  // a rejected promise
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, employee.password, (err, result) => {
				if (result) {
					resolve(employee)
				} else {
					reject()
				}
			})
		})
	})
}

// make a model using the User schema
const Employee = mongoose.model('Employee', EmployeeSchema)
const MessageEmployee = mongoose.model('MessageEmployee', MessageEmployeeSchema)
module.exports = { Employee, MessageEmployee}
