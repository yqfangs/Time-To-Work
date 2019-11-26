'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')
const path = require('path')

// import the mongoose models
const { Employer } = require('./db/models/employer')
const { Employee } = require('./db/models/employee')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(session({
    secret: 'oursecret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60000,
        httpOnly: true
    }
}));

// Our own express middleware to check for 
// an active user on the session cookie (indicating a logged in user.)
const sessionChecker = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next(); // next() moves on to the route.
    }    
};

// A route to login and create a session
app.post('/employees/login', (req, res) => {
	const email = req.body.email
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
	Employee.findByEmailPassword(email, password).then((employee) => {
	    if (!employee) {
            res.redirect('/login.html');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = employee._id;
            res.redirect('/dashboard');
        }
    }).catch((error) => {
		res.status(400).redirect('/login');
    })
})
/*** Webpage routes below **********************************/

// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

// login route serves the login page
app.get('/login', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
    if (req.session.user) {
        res.sendFile(__dirname + '/frontend/dashboard.html');
    } else {
        res.redirect('/login')
    }

})

app.use("/css", express.static(__dirname + '/public/css'));
// static js directory
app.use("/js", express.static(__dirname + '/public/js'))

/*********************************************************/

/*** API Routes below ************************************/

/** Student resource routes **/
// a POST route to *create* a student
app.post('/employees', (req, res) => {
	// log(req.body)

	// Create a new student using the Student mongoose model
	const employee = new Employee({
		name: req.body.name,
		email: req.body.email,
		password: req.body.email,
		position: req.body.position,
		phone: req.body.phone,
		companyName: req.body.companyName
	})

	employee.save().then((result) => {
		res.send(result)
	}, (error) => {
		res.status(400).send(error) // 400 for bad request
	})
})

// A route to login and create a session
app.post('/employees/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    // Use the static method on the User model to find a user
    // by their email and password
    Employee.findByEmailPassword(email, password).then((employee) => {
        if (!employee) {
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = employee._id;
            res.redirect('/dashboard');
        }
    }).catch((error) => {
        res.status(400).redirect('/login');
    })
})
/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
}) 

