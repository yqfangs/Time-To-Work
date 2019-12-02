const log = console.log;
const express = require('express');
const router = express.Router();
const { Employer } = require('../db/models/employer');
const { Employee } = require('../db/models/employee');

/** Routes in this file start at /api/message */
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

//find all employees and employers
router.get('/allEmployeesAndEmployers', (req, res) => {
	Employee.find().then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			res.send(employee)
		}
	}, (error) => {
		res.status(500).send(error)
	})

	Employer.find().then((employer) => {
		if(!employer){
			res.status(404).send()
		}else{
			res.send(employer)
		}
	}, (error) => {
		res.status(500).send(error)
	})

})

module.exports = router;