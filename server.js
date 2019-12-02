/* server.js nov 20 */
'use strict';
const log = console.log

const express = require('express')
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require('./db/mongoose')

// import the mongoose models
const { Employee } = require('./db/models/employee')
const { Employer } = require('./db/models/employer')
// const { User } = require('./models/user')

// to validate object IDs
const { ObjectID } = require('mongodb')

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser')
app.use(bodyParser.json())

// express-session for managing user sessions
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }));


// helper functions
const { server_helper } = require('./server_helper.js')

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
            res.redirect('/dashboard');
        }
    }).catch((error) => {
        log('error')
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

/*** API Routes below ************************************/
/** Employee routes below **/
app.post('/api/employees', (req, res) => {

    // Create a new EMployee
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        phone: req.body.phone,
        companyName: req.body.companyName
    })

    // Save the Employee
    employee.save().then((employee) => {
        log('alright')
        res.redirect('/login')
        // res.send(employee)
    }, (error) => {
        //res.redirect('/signup')
        log('here')
        res.status(400).redirect('/signup') // 400 for bad request
    })
})

app.get('/api/employees/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Employee.findById(id).then((employee) =>{
        if(!employee){
            res.status(404).send()
        } else{
            res.send(employee)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})


app.get('/TimeAvail/load', (req, res) => {
  if (req.session.user) {
    Employee.findOne({_id: req.session.user}).then((employee) => {
      if (!employee) {
        res.status(404).send()
      }
      else {
        res.send(employee)
      }
    }).catch((error) => {
      res.status(500).send()
    })
  }
  else {
    res.redirect('/login')
  }
})

// app.get('/TimeAvail/:email', (req, res) => {
//   const email = req.params.email
//   Employee.findOne({email: email}).then((employee) => {
//     if (!employee) {
//       res.status(404).send()
//     }
//     else {
//       res.send(employee)
//     }
//   }).catch((error) => {
//     res.status(500).send()
//   })
// })

app.patch('/TimeAvail', (req, res) => {
  // const email = req.params.email
  if (req.session.user) {
    const newAvail = req.body.availability
    // check if new availability is valid
    if (!(server_helper.validate_avail(newAvail))) {
      res.status(400).send()
    }
    else {
      Employee.findOneAndUpdate({_id: req.session.user}, {$set: {availability: newAvail}}, {new: true}).then((employee) => {
        if (!employee) {
          log(req.session.user)
          res.status(404).send()
        }
        else {
          res.send({
            "new availability": newAvail,
            "employee": employee
          })
        }
      }).catch((error) => {
        log(error)
        res.status(500).send()
      })
    }
  }
  else {
    res.redirect('/login')
  }
})


// app.post('/timeavail/:id', (req, res) =>{
//     const id = req.params.id

//     if(!ObjectID.isValid(id)){
//         res.status(404).send()
//     }

//     const timeavail = {
//         start: req.body.start,
//         end: req.body.end,
//         duration: req.body.start - req.body.end
//     }

//     mongoose.set("useFindAndModify", false)
//     Employee.findByIdAndUpdate(id,
//         {$push: {avaliability: timeavail}},
//         {new: true}).then((employee) => {
//         if(!employee){
//             res.status(404).send()
//         } else{
//             res.send({timeavail, employee})
//         }
//     }).catch((error)=>{
//         res.status(500).send()
//     })

// })

// app.get('/employees/:id/message', (req, res) =>){
//     const id = req.params.id

//     if(!ObjectID.isValid(id)){
//         res.status(404).send()
//     }

//     Message.find().then((messages) =>{
//         const allMessages = messages;
//         allMessages.filter()

//     })
// }

/** Employer routes below **/

app.post('/api/employers', (req, res) => {
    log(req.body)

    // Create a new Employer
    const employer = new Employer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        companyName: req.body.companyName
    })

    // Save the Employer
    employer.save().then((employer) => {
        res.send(employer)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

app.get('/api/employers/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Employer.findById(id).then((employer) =>{
        if(!employer){
            res.status(404).send()
        } else{
            res.send(employer)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})

/** Company routes below **/
app.post('/api/companies', (req, res) => {
    log(req.body)

    // Create a new Company
    const company = new Company({
        name: req.body.name,
        openHours: req.body.openHours
    })

    // Save the Company
    company.save().then((company) => {
        res.send(company)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

app.get('/api/companies/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Company.findById(id).then((company) =>{
        if(!company){
            res.status(404).send()
        } else{
            res.send(company)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001
app.listen(port, () => {
    log(`Listening on port ${port}...`)
})
