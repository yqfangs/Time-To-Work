/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const log = console.log
const ObjectId = mongoose.ObjectId

const SALT_FACTOR = 10

const TimeIntervalSchema = new mongoose.Schema({
	start: Number,
	end: Number,
	duration: Number
})

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
	shifts:[TimeIntervalSchema]
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

EmployeeSchema.statics.findByEmailPassword = function(email, password) {
	const Employee = this

	return Employee.findOne({ email: email }).then((employee) => {
		if (!employee) {
			return Promise.reject()  // a rejected promise
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
const TimeInterval = mongoose.model('TimeInterval', TimeIntervalSchema)
module.exports = { Employee, TimeInterval }
