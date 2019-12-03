const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { Company } = require('../db/models/company')
const { server_helper } = require('../server_helper.js')

const authenticate = (req, res, next) => {
	if (req.session.user) {
		Employer.findById(req.session.user).then((emp) => {
			if (!emp) {
				return Promise.reject()
			} else {
				req.employer = emp
				next()
			}
		}).catch((error) => {
			res.status(401).send("Unauthorized")
		})
	} else {
		res.redirect('/login')
	}
}


/** Routes in this file start at /api/scheduling */
router.get('/user', authenticate, (req, res) => {
  res.send(req.employer)
})


router.get('/company', (req, res) => {
  Company.findOne({name: req.employer.companyName}).then((company) => {
    if (!company) {
      res.status(404).send()
    }
    else {
      res.send(company)
    }
  })
  .catch((error) => {
    res.status(500).send()
  })
})


router.get('/', authenticate, (req, res) => {
  Company.findOne({name: req.employer.companyName}).then((company) => {
    if (!company) {
      log(employer)
      res.status(404).send()
    }
    else {
      Employee.find({companyName: company.name}).then((myEmployees) => {
        res.send(myEmployees)
      })
    }
  })
  .catch((error) => {
    res.status(500).send()
  })
})


router.patch('/', authenticate, (req, res) => {
    const allShifts = req.body.shifts
    const email = req.body.email

    Company.findOne({name: req.employer.companyName})
    .then((company) => {
      if (!company) {
        res.status(404).send()
      }
      else if (!server_helper.validate_shifts(allShifts, company.openHours)) {
        res.status(400).send()
      }
      else {
        Employee.findOneAndUpdate({email: email, companyName: company.name}, {$set: {shifts: allShifts}}, {new: true})
        .then((employee) => {
          if (!employee) {
            res.status(404).send()
          }
          else {
            res.send(employee)
          }
        })
      }
    })
    .catch((error) => {
      log(error)
      res.status(500).send()
    })
})


// Patch the shifts array of the employee document with id
router.patch('/:id', (req, res) => {
  const allShifts = req.body.shifts
  const companyName = req.body.companyName
  const id = req.params.id

  Company.findOne({name: companyName})
  .then((company) => {
    if (!company) {
      res.status(404).send()
    }
    else if (!server_helper.validate_shifts(allShifts, company.openHours)) {
      res.status(400).send()
    }
    else {
      Employee.findOneAndUpdate({_id: id, companyName: company.name}, {$set: {shifts: allShifts}}, {new: true})
      .then((employee) => {
        if (!employee) {
          res.status(404).send()
        }
        else {
          res.send(employee)
        }
      })
    }
  })
  .catch((error) => {
    log(error)
    res.status(500).send()
  })
})


module.exports = router;
