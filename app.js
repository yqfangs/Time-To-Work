const express = require('express')
const mongoose = require('./db/mongoose')

const { User } = require('./db/models/user')
const app = express();

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)
}) 

async function init() {
	const admin = await  User.findOneAndUpdate({
		userName: 'admin',
		password: 'admin'
	})
	console.log(admin)
}

init()

