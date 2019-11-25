const express = require('express')
const mongoose = require('./db/mongoose')
const path = require('path')

const { User } = require('./db/models/user')
const app = express();

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3000
app.listen(port, () => {
	console.log(`Listening on port ${port}...`)

	initDbData()
}) 

app.use(express.static(__dirname + '/frontend'))

async function initDbData() {
	const user = new User({
		userName: 'admin',
		password: 'admin'
	})
	User.find({userName: user.userName, password: user.password}).then(
		res => {
			if (res.length) {
				console.log('Admin already exists')
			} else {
				user.save().then( res => 
					console.log(res)
				)
			}
		})
}


