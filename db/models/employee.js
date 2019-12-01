/* Employee mongoose model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const TimeInterval = new mongoose.Schema({
	start: Number,
	end: Number,
	duration: Number
})

// const Message = mongoose.model('Message', {
// 	from: Employee,
// 	to: Employee,
// 	message: String,
// 	isTrade: Boolean
// })

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
	//message:[Message]
})

EmployeeSchema.pre('save', function(next) {
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
			bcrypt.compare(password, employee.password, (err, result) => {
				if (result) {
					log(user)
					resolve(employee)
				} else {
					reject()
				}
			})
		})
	})
}


const Employee = mongoose.model('Employee', EmployeeSchema)
module.exports = { Employee, TimeInterval }
// module.exports = { Employee, Message }
