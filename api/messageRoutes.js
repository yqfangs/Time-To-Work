const log = console.log;
const express = require('express');
const router = express.Router();
const { ObjectID } = require('mongodb');
const { Employer } = require('../db/models/employer');
const { Employee, MessageEmployeeSchema } = require('../db/models/employee');

/** Routes in this file start at /api/message */

// route to get current user
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

/// Route for getting all employee information.
router.get('/employees', (req, res) => {
	// Add code here

	Employee.find().then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			res.send(employee)
		}
	}, (error) => {
		res.status(500).send(error)
	})
})

/// Route for getting information for one emplyee.
router.get('/employees/:id', (req, res) => {

    const employeeID = req.params.id;

	if(!ObjectID.isValid(employeeID)){
		res.status(404).send()
	}

	Employee.findById(employeeID).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			res.send(employee)
		}
	}, (error) => {
		res.status(500).send(error)
	})
})

/// Route for adding trade shift message to a particular employee.
/* 
Request body expects:
{
	"from": <email>,
	"to": <email>,
	"isTrade": <true or flase>,
	"tradeTime": <time interval>,
	"tradeWeekDay": <weekday from Mon to Sun represent as number from 1-7
}
*/
router.post('/employees/newTradeMessage', (req, res) => {

	const message = {
		from: req.body.from,
		to: req.body.to,
		isTrade: req.body.isTrade,
		tradeTime: req.body.tradeTime,
		tradeWeekDay: req.body.tradeWeekDay,
	}

	Employee.findOne({ email: req.body.from }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			employeeFrom.messages.push(message)
			employeeFrom.shifts[req.body.tradeWeekDay - 1] = {}
		}
		employeeFrom.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})

	Employee.findOne({ email: req.body.to }).then((employeeTo) => {
		if(!employeeTo){
			res.status(404).send()
		}else{
			employeeTo.messages.push(message)
			employeeTo.shifts[req.body.tradeWeekDay - 1] = req.body.tradeTime;
		}
		employeeTo.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})
})

/// Route for adding regular message to a particular employee.
/* 
Request body expects:
{
	"from": <email>,
	"to": <email>,
	"message": <string of message>
}
*/
router.post('/employees/newRegularMessage', (req, res) => {

	const message = {
		from: req.body.from,
		to: req.body.to,
		message: reg.body.message
	}

	Employee.findOne({ email: req.body.from }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			employeeFrom.messages.push(message)
		}
		employeeFrom.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})

	Employee.findOne({ email: req.body.to }).then((employeeTo) => {
		if(!employeeTo){
			res.status(404).send()
		}else{
			employeeTo.messages.push(message)
		}
		employeeTo.save().then((result) => {
			res.send(result)
		}, (error) => {
			res.status(400).send(error)
		})
	}, (error) => {
		res.status(400).send(error)
	})
})

/// Route for deleting message
router.delete('/employees/:id/:mes_id', (req, res) => {
	// Add code here
	const employeeID = req.params.id;
	const messageID = req.params.mes_id;

	if((!ObjectID.isValid(employeeID)) || (!ObjectID.isValid(messageID))){
		res.status(404).send()
	}

	Employee.findById(employeeID).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			const message = employee.messages.id(messageID);
			if(!message){
				res.status(404).send()
			}else{
				employee.messages.pull(message)
			}
			employee.save().then((result) => {
				res.send(result)
			}, (error) => {
				res.status(500).send(error)
			})
		}
	}, (error) => {
		res.status(500).send(error)
	})
})

module.exports = router;