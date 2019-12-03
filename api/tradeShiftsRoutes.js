const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { Company } = require('../db/models/company')
const { server_helper } = require('../server_helper.js')

/** Routes in this file start at /api/tradeshifts */
router.get('/user', (req, res) => {
  if (req.session.user) {
    Employee.findById(req.session.user).then((employee) => {
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



router.get('/', (req, res) => {
    if (req.session.user) {
      Employee.findById(req.session.user).then((employee) => {
        if (!employee) {
          res.status(404).send()
        }
        else {
          Company.findOne({name: employee.companyName}).then((company) => {
            if (!company) {
              log(employer)
              res.status(404).send()
            }
            else {
              Employee.find({companyName: company.name, name: {$ne: employee.name}}).then((myCoworkers) => {
                // if (myCoworkers.length == 0) {
                //   log("no coworkers")
                //   res.status(404).send()
                // }
                // else {
                  res.send(myCoworkers)
                // }
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



module.exports = router;
