/* Employer mongoose model */
'use strict';

const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const SALT_FACTOR = 10


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

EmployerSchema.pre('save', function(next) {
	const employer = this; // binds this to employer document instance

	//only hash again if we modify/ its new
	if (employer.isModified('password')) {
		bcrypt.genSalt(SALT_FACTOR, (err, salt) => {
			bcrypt.hash(employer.password, salt, (err, hash) => {
				employer.password = hash
				next()
			})
		})
	} else {
		next()
	}
})

EmployerSchema.pre('findOneAndUpdate', function(next) {
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


EmployerSchema.statics.findByEmailPassword = function(email, password) {
	const Employer = this

	return Employer.findOne({ email: email }).then((employer) => {
		if (!employer) {
			return Promise.reject("No matching email")  // a rejected promise
		}
		return new Promise((resolve, reject) => {
			bcrypt.compare(password, employer.password, (err, result) => {
				if (result) {
					resolve(employer)
				} else {
					reject()
				}
			})
		})
	})
}

const Employer = mongoose.model('Employer', EmployerSchema)
module.exports = { Employer }