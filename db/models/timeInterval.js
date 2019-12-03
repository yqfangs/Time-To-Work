
const mongoose = require('mongoose')

const TimeIntervalSchema = new mongoose.Schema({
	start: Number,
	end: Number,
	duration: Number
	// start: {
	// 	type: Number,
	// 	required: true
	// },
	// end: {
	// 	type: Number,
	// 	required: true
	// },
	// duration: {
	// 	type: Number,
	// 	required: true
	// }
})

const TimeInterval = mongoose.model('TimeInterval', TimeIntervalSchema)
module.exports = {TimeInterval, TimeIntervalSchema}
