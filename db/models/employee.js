/* Employee mongoose model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const TimeInterval = mongoose.model('TimeInterval', {
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
		minlength: 6
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
	availability:[TimeInterval],
	shifts:[TimeInterval]
})

Employee.pre('save', function(next) {
	const employee = this; 
	if (employee.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(employee.password, salt, (err, hash) => {
				employee.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = { Employee, TimeInterval }