const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Company } = require('../db/models/company')
const { server_helper } = require('../server_helper.js')

/** Routes in this file start at /api/TimeAvail */
router.get('/', (req, res) => {
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

router.get('/company', (req, res) => {
  if (req.session.user) {
    Employee.findById(req.session.user).then((employee) => {
      if (!employee) {
        res.status(404).send()
      }
      else {
        Company.findOne({name: employee.companyName}).then((company) => {
          if (!company) {
            res.status(404).send()
          }
          else {
            res.send(company)
          }
        })
      }
    }).catch((error) => {
      log(error)
      res.status(500).send()
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
          Employee.findOneAndUpdate({_id: req.session.user}, {$set: {availability: newAvail}}, {new: true}).then((employee) => {
            if (!employee) {
              log(req.session.user)
              res.status(404).send()
            }
            else {
              res.send({
                "employee": employee
              })
            }
          }).catch((error) => {
            log(error)
            res.status(500).send()
          })
        }
      })
    }
    else {
      res.redirect('/login')
    }
  })

module.exports = router;
