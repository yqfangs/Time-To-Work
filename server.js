/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
const { mongoose } = require('./db/mongoose')
const { Employee } = require('./db/models/employee')
const { ObjectID } = require('mongodb')
const bodyParser = require('body-parser')
const { User } = require('./db/models/user')
const { Employer } = require('./db/models/employer')
const session = require('express-session')

// const multer = require('multer');

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
    log("check session")
    if (req.session.user) {
        res.redirect('/dashboard'); // redirect to dashboard if logged in.
    } else {
        next() //moves on to the route.
    }
};

// A route to login and create a session
app.post('/login', (req, res) => {
    const email = req.body.email
    const password = req.body.password

    if(email === 'admin' && password === 'admin'){
        res.redirect('/admin')
    }else{

        // Use the static method on the User model to find a user
        // by their email and password
        Employee.findByEmailPassword(email, password).then((employee) => {
            if (!employee) {
                Employer.findByEmailPassword(email, password).then((employer) => {
                    if (!employer) {
                        log("no such employer")
                        res.redirect('/login');
                    } else {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                        req.session.user = employer._id;
                        req.session.type = "employer"
                        log(req.session.type)
                        console.log(employer._id)
                        res.redirect('/dashboard');
                    }
                 }).catch((error) => {
                    log(error)
                    res.status(400).redirect('/login');
                 })
            } else {
                // Add the user's id to the session cookie.
                // We can check later if this exists to ensure we are logged in.
                log("found employee")
                req.session.user = employee._id;
                req.session.type = "employee"
                console.log(employee._id)
                res.redirect('/dashboard');
            }
        }).catch((error) => {
            log("employee " + error)
            res.status(400).redirect('/login');
        })

    }
})

// A route to logout a user
app.get('/employee/logout', (req, res) => {
    // Remove the session
    req.session.destroy((error) => {
        if (error) {
            res.status(500).send(error)
        } else {
            log("logout")
            res.redirect('/login')
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
    if (req.session.user) {
       res.sendFile(__dirname + '/frontend/dashboard.html');
    } else {
        res.redirect('/login')
    }

})

app.get('/profile', (req, res) => {
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

app.get('/admin', (req, res) => {
    res.sendFile(__dirname + '/frontend/admin.html');
})

app.get('/companyInfo', (req, res) => {
    res.sendFile(__dirname + '/frontend/companyInfo.html');
})

app.get('/userInfo', (req, res) => {
    res.sendFile(__dirname + '/frontend/userInfo.html');
})

// static js directory
app.use("/css", express.static(__dirname + '/public/css'))
app.use("/js", express.static(__dirname + '/public/js'))
app.use("/img", express.static(__dirname + '/public/img'))
// app.use(multer({ dest: __dirname + '/pubic/uploads/',
//  rename: function (fieldname, filename) {
//    return filename;
//  },
// }));
/*********************************************************/
/*** Declare API routes ************************************/

app.use("/api/employees", require('./api/employeesRoutes.js'))
app.use("/api/employers", require('./api/employersRoutes.js'))
app.use("/api/companies", require('./api/companiesRoutes.js'))
app.use("/api/dashboard", require('./api/dashboardRoutes.js'))
// app.use("/api/profile", require('./api/profileRoutes.js'))
app.use("/api/TimeAvail", require('./api/timeAvailRoutes.js'))
app.use("/api/scheduling", require('./api/schedulingRoutes.js'))
app.use("/api/tradeshifts", require('./api/tradeShiftsRoutes.js'))
app.use("/api/message", require('./api/messageRoutes.js'))

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
