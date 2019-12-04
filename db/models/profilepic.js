const mongoose = require('mongoose')
const ObjectId = mongoose.ObjectId

const profilePicSchema = new mongoose.Schema({
	path: {
		type: String
	},
	creator: ObjectId
})

module.exports = mongoose.model('Pics', profilePicSchema)
