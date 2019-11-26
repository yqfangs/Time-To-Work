/* Employer mongoose model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const EmployerSchema = new mongoose.Schema({
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
	}
})

Employer.pre('save', function(next) {
	const employer = this; 

	if (employer.isModified('password')) {
		// generate salt and hash the password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(employer.password, salt, (err, hash) => {
				employer.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

const Employer = mongoose.model('Employer', EmployerSchema)
module.exports = { Employer }