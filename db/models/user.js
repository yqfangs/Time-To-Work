/* Student mongoose model */
const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		minlegth: 1,
		unique: true,
		trim: true
	},
	password: {
		type: String,
		required: true,
		minlength: 1
	}
})

// make a model using the User schema
const User = mongoose.model('User', UserSchema)
module.exports = { User }
