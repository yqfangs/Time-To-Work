/* User model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const log = console.log

const TimeIntervalSchema = new mongoose.Schema({
	start: Number,
	end: Number,
	duration: Number
})

// Making a Mongoose model a little differently: a Mongoose Schema
// Allows us to add additional functionality.
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

// An example of Mongoose middleware.
// This function will run immediately prior to saving the document
// in the database.
EmployeeSchema.pre('save', function(next) {
	const employee = this; // binds this to User document instance

	// checks to ensure we don't hash password more than once
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

// A static method on the document model.
// Allows us to find a User document by comparing the hashed password
//  to a given one, for example when logging in.
EmployeeSchema.statics.findByEmailPassword = function(email, password) {
	const Employee = this // binds this to the User model

	// First find the user by their email
	return Employee.findOne({ email: email }).then((employee) => {
		if (!employee) {
			return Promise.reject()  // a rejected promise
		}
		// if the user exists, make sure their password is correct
		return new Promise((resolve, reject) => {
			log(password)
			bcrypt.compare(password, employee.password, (err, result) => {
				log("MATCH! " + result)
				if (result) {
					resolve(employee)
				} else {
					log('reject')
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
