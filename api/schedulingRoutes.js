const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { Company } = require('../db/models/company')
const { server_helper } = require('../server_helper.js')

/** Routes in this file start at /api/TimeAvail */
router.get('/', (req, res) => {
    if (req.session.user) {
      Employer.findById(req.session.user).then((employer) => {
        if (!employer) {
          res.status(404).send()
        }
        else {
          Company.findOne({name: employer.companyName}).then((company) => {
            if (!company) {
              res.status(404).send()
            }
            else {
              Employee.find({companyName: company.name}).then((myEmployees) => {
                if (myEmployees.length == 0) {
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
        res.status(500).send(error)
      })
    }
    else {
      res.redirect('/login')
    }
  })

  // router.get('/:email', (req, res) => {
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

  router.patch('/', (req, res) => {
    // const email = req.params.email
    if (req.session.user) {
      const newShifts = req.body.shifts
      // check if new availability is valid
      if (!(server_helper.validate_shifts(newShifts))) {
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

module.exports = router;
