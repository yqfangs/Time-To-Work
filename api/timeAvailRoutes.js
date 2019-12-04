const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
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


/** Routes in this file start at /api/TimeAvail */
router.get('/', authenticate, (req, res) => {
  res.send(req.employee)
})


router.get('/company', authenticate, (req, res) => {
      Company.findOne({name: req.employee.companyName}).then((company) => {
        if (!company) {
          res.status(404).send()
        }
        else {
          res.send(company)
        }
      })
      .catch((error) => {
        log(error)
        res.status(500).send()
      })
})


router.patch('/', authenticate, (req, res) => {

  const newAvail = req.body.availability
  const companyName = req.body.companyName
  // check if new availability is valid
  Company.findOne({name: companyName}).then((company) => {
    if (!company) {
      res.status(404).send()
    }
    else if (!(server_helper.validate_avail(newAvail, company.openHours))) {
      res.status(400).send()
    }
    else {
      Employee.findOneAndUpdate({_id: req.employee}, {$set: {availability: newAvail}}, {new: true}).then((employee) => {
        if (!employee) {
          res.status(404).send()
        }
        else {
          res.send(employee)
        }
      })
    }
  }).catch((error) => {
    log(error)
    res.status(500).send()
  })
})


router.patch('/:id', (req, res) => {
  const id = req.params.id
  const newAvail = req.body.availability
  const companyName = req.body.companyName
  // check if new availability is valid
  Company.findOne({name: companyName}).then((company) => {
    if (!company) {
      res.status(404).send()
    }
    else if (!(server_helper.validate_avail(newAvail, company.openHours))) {
      res.status(400).send()
    }
    else {
      Employee.findOneAndUpdate({_id: id}, {$set: {availability: newAvail}}, {new: true}).then((employee) => {
        if (!employee) {
          res.status(404).send()
        }
        else {
          res.send(employee)
        }
      })
    }
  }).catch((error) => {
    log(error)
    res.status(500).send()
  })

})


module.exports = router;
