/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
const { mongoose } = require('./db/mongoose')
const { Employee } = require('./db/models/employee')
const { ObjectID } = require('mongodb')
const bodyParser = require('body-parser') 
const { User } = require('./db/models/user')
const session = require('express-session')
const { server_helper } = require('./server_helper.js')

// starting the express server
const app = express();
app.use(bodyParser.json())

// express-session for managing user sessions
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
            res.redirect('/login');
        } else {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = employee._id;
            console.log(employee._id)
            res.redirect('/dashboard');
        }
    }).catch((error) => {
        log('login '+ error)
        res.status(400).redirect('/login');
    })
})

// A route to logout a user
app.get('/employee/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            res.redirect('/')
        }
    })
})


/*** Webpage routes below **********************************/
// Inject the sessionChecker middleware to any routes that require it.
// sessionChecker will run before the route handler and check if we are
// logged in, ensuring that we go to the dashboard if that is the case.

// The various redirects will ensure a proper flow between login and dashboard
// pages so that your users have a proper experience on the front-end.

// route for root: should redirect to login route
app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login')
})

// login route serves the login page
app.get('/login', sessionChecker, (req, res) => {
    res.sendFile(__dirname + '/frontend/index.html')
})

app.get('/signup', (req, res) => {
    res.sendFile(__dirname + '/frontend/signup.html')
})

// dashboard route will check if the user is logged in and server
// the dashboard page
app.get('/dashboard', (req, res) => {
    log(req.session.user)
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/dashboard.html');
    } else {
        res.redirect('/login')
    }

})

app.get('/profile', (req, res) => {
    log(req.session.user)
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/profile.html');
    } else {
        res.redirect('/login')
    }

})

app.get('/Scheduling', (req, res) => {
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/Scheduling.html');
    } else {
        res.redirect('/login')
    }

})

app.get('/TimeAvail', (req, res) => {
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/TimeAvail.html');
    } else {
        res.redirect('/login')
    }


})

app.get('/tradeShifts', (req, res) => {
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/tradeShifts.html');
    } else {
        res.redirect('/login')
    }

})

app.get('/message', (req, res) => {
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/message.html');
    } else {
        res.redirect('/login')
    }

})

// static js directory
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/js", express.static(__dirname + '/public/js'))

/*********************************************************/
/*** Declare API routes ************************************/

app.use("/api/employees", require('./api/employeesRoutes.js'))
app.use("/api/employers", require('./api/employersRoutes.js'))
app.use("/api/companies", require('./api/companiesRoutes.js'))
app.use("/api/timeAvail", require('./api/timeAvailRoutes.js'))

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)

	initDbData()
}) 

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
