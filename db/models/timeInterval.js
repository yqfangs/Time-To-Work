
const mongoose = require('mongoose')

const TimeIntervalSchema = new mongoose.Schema({
	start: Number,
	end: Number,
	duration: Number
})

const TimeInterval = mongoose.model('TimeInterval', TimeIntervalSchema)
module.exports = {TimeInterval, TimeIntervalSchema}
