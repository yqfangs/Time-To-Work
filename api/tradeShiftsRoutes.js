const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { Company } = require('../db/models/company')
const { server_helper } = require('./server_helper.js')

const authenticate = (req, res, next) => {
	if (req.session.user) {
		Employee.findById(req.session.user).then((emp) => {
			if (!emp) {
				return Promise.reject()
			} else {
				req.employee = emp
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.redirect('/login')
	}
}


/** Routes in this file start at /api/tradeshifts */

router.get('/user', authenticate, (req, res) => {
  res.send(req.employee)
})



router.get('/', authenticate, (req, res) => {
  Company.findOne({name: req.employee.companyName}).then((company) => {
    if (!company) {
      res.status(404).send()
    }
    else {
      Employee.find({companyName: company.name, name: {$ne: req.employee.name}}).then((myCoworkers) => {
        res.send(myCoworkers)
      })
    }
  })
  .catch((error) => {
    res.status(500).send()
  })
})



module.exports = router;
