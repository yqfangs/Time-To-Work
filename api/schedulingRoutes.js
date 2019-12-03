const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { Company } = require('../db/models/company')
const { server_helper } = require('../server_helper.js')

/** Routes in this file start at /api/scheduling */
router.get('/user', (req, res) => {
  if (req.session.user) {
    Employer.findById(req.session.user).then((employer) => {
      if (!employer) {
        res.status(404).send()
      }
      else {
        res.send(employer)
      }
    }).catch((error) => {
      res.status(500).send()
    })
  }
  else {
    res.redirect('/login')
  }
})


router.get('/company', (req, res) => {
  if (req.session.user) {
    Employer.findById(req.session.user).then((employer) => {
      if (!employer) {
        res.status(404).send()
      }
      else {
        Company.findOne({name: employer.companyName}).then((company) => {
          if (!company) {
            log(employer)
            res.status(404).send()
          }
          else {
            res.send(company)
          }
        })
      }
    }).catch((error) => {
      res.status(500).send()
    })
  }
  else {
    res.redirect('/login')
  }
})


router.get('/', (req, res) => {
    if (req.session.user) {
      Employer.findById(req.session.user).then((employer) => {
        if (!employer) {
          res.status(404).send()
        }
        else {
          Company.findOne({name: employer.companyName}).then((company) => {
            if (!company) {
              log(employer)
              res.status(404).send()
            }
            else {
              Employee.find({companyName: company.name}).then((myEmployees) => {
                if (myEmployees.length == 0) {
                  log("no coworkers")
                  res.status(404).send()
                }
                else {
                  res.send(myEmployees)
                }
              })
            }
          })

        }
      }), ((error) => {
        res.status(500).send()
      })
    }
    else {
      res.redirect('/login')
    }
  })


  router.patch('/', (req, res) => {
    // const email = req.params.email
    if (req.session.user) {
      const allShifts = req.body.shifts
      const email = req.body.email

      Employer.findById(req.session.user)
      .then((employer) => {
        if (!employer) {
          res.status(404).send()
        }
        else {
          Company.findOne({name: employer.companyName})
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
        }
      })
      .catch((error) => {
        log(error)
        res.status(500).send()
      })
    }

    else {
      res.redirect('/login')
    }
  })

module.exports = router;
