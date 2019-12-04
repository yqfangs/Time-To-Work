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
		res.status(500).send()
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
		res.status(500).send()
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
	"message": <empty string>
	"tradeResponse": <'W' = wait 'A' = accpet 'D' = 'decline'>
}
*/
router.post('/employees/newTradeMessage', (req, res) => {

	let dateTime = "";
	if(req.body.tradeWeekDay === 0){
		dateTime = "Monday"
	}
	else if(req.body.tradeWeekDay === 1){
		dateTime = "Tuesday"
	}
	else if(req.body.tradeWeekDay === 2){
		dateTime = "Wednesday"
	}
	else if(req.body.tradeWeekDay === 3){
		dateTime = "Thursday"
	}
	else if(req.body.tradeWeekDay === 4){
		dateTime = "Friday"
	}
	else if(req.body.tradeWeekDay === 5){
		dateTime = "Saturday"
	}
	else if(req.body.tradeWeekDay === 6){
		dateTime = "Sunday"
	}

	const message = {
		from: req.body.from,
		to: req.body.to,
		isTrade: req.body.isTrade,
		tradeTime: req.body.tradeTime,
		tradeWeekDay: req.body.tradeWeekDay,
		message: "Changing shifts request:[From: " + req.body.tradeTime.start + ", To: " + req.body.tradeTime.end + ", On: " + dateTime + "]",
		tradeResponse: req.body.tradeResponse
	}

	Employee.findOne({ email: req.body.from }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			employeeFrom.messages.push(message)
		}
		employeeFrom.save().then((result) => {
			res.send(result)
		}).catch((error) => res.status(400).send())
	}).catch((error) => res.status(400).send())

	Employee.findOne({ email: req.body.to }).then((employeeTo) => {
		if(!employeeTo){
			res.status(404).send()
		}else{
			employeeTo.messages.push(message)
		}
		employeeTo.save().then((result) => {
			res.send(result)
		}).catch((error) => res.status(400).send())
	}).catch((error) => res.status(400).send())
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
		message: req.body.message
	}

	Employee.findOne({ email: req.body.from }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			employeeFrom.messages.push(message)
		}
		employeeFrom.save().then((result) => {
			res.send(result)
		}).catch((error) => res.status(400).send())
	}).catch((error) => res.status(400).send())

	Employee.findOne({ email: req.body.to }).then((employeeTo) => {
		if(!employeeTo){
			res.status(404).send()
		}else{
			employeeTo.messages.push(message)
		}
		employeeTo.save().then((result) => {
			res.send(result)
		}).catch((error) => res.status(400).send())
	}).catch((error) => res.status(400).send())
})

/// Route for deleting message on sent box
router.delete('/employees/sent/:current_email/:to_email/:cur_message', (req, res) => {

	const current_email = req.params.current_email;
	const to_email = req.params.to_email;
	const cur_message = req.params.cur_message;


	Employee.findOne({ email: current_email }).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			if(employee.messages.length === 0){
				res.status(404).send()
			}else{
				let flag = false;
				let list_cpy = employee.messages;
				for(let i = 0; i < employee.messages.length; i++){
					if(employee.messages[i].to === to_email && employee.messages[i].isTrade === false && employee.messages[i].message === cur_message){
						list_cpy.splice(i, 1);
						flag = true;
						break;
					}
				}
				//not find same to
				if(flag === false){
					res.status(500).send()
				}else{
					employee.messages = list_cpy;
				}
			}
			employee.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
		}
	}).catch((error) => res.status(500).send())
})

/// Route for deleting message on inbox
router.delete('/employees/inbox/:current_email/:from_email/:cur_message', (req, res) => {

	const current_email = req.params.current_email;
	const from_email = req.params.from_email;
	const cur_message = req.params.cur_message;

	Employee.findOne({ email: current_email }).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			if(employee.messages.length === 0){
				res.status(404).send()
			}else{
				let flag = false;
				let list_cpy = employee.messages;
				for(let i = 0; i < employee.messages.length; i++){
					if(employee.messages[i].from === from_email && employee.messages[i].isTrade === false && employee.messages[i].message === cur_message ){
						list_cpy.splice(i, 1);
						flag = true;
						break;
					}
				}
				//not find same from email
				if(flag === false){
					res.status(500).send()
				}else{
					employee.messages = list_cpy;
				}
			}
			employee.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
		}
	}).catch((error) => res.status(500).send())
})

/// Route for decline trade message on inbox
router.delete('/employees/inbox/trade/decline/:current_email/:from_email/:cur_message', (req, res) => {

	const current_email = req.params.current_email;
	const from_email = req.params.from_email;
	const cur_message = req.params.cur_message;

	Employee.findOne({ email: current_email }).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			if(employee.messages.length === 0){
				res.status(404).send()
			}else{
				let flag = false;
				let list_cpy = employee.messages;
				for(let i = 0; i < employee.messages.length; i++){
					if(employee.messages[i].from === from_email && employee.messages[i].isTrade === true && employee.messages[i].message === cur_message){
						list_cpy.splice(i, 1);
						flag = true;
						break;
					}
				}
				//not find same from email
				if(flag === false){
					res.status(500).send()
				}else{
					employee.messages = list_cpy;
				}
			}
			employee.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
		}
	}).catch((error) => res.status(500).send())

	Employee.findOne({ email: from_email }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			if(employeeFrom.messages.length === 0){
				res.status(404).send()
			}else{
				for(let j = 0; j < employeeFrom.messages.length; j++){
					if(employeeFrom.messages[j].from === from_email && employeeFrom.messages[j].isTrade === true && employeeFrom.messages[j].message === cur_message){
						employeeFrom.messages[j].tradeResponse = 'D';
						break;
					}
				}
			}
			employeeFrom.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
		}
	}).catch((error) => res.status(500).send())
})

/// Route for accept trade message on inbox
router.delete('/employees/inbox/trade/accept/:current_email/:from_email/:cur_message', (req, res) => {

	const current_email = req.params.current_email;
	const from_email = req.params.from_email;
	const cur_message = req.params.cur_message;

	//delete current message and modify current
	Employee.findOne({ email: current_email }).then((employee) => {
		if(!employee){
			res.status(404).send()
		}else{
			if(employee.messages.length === 0){
				res.status(404).send()
			}else{
				let flag = false;
				let list_cpy = employee.messages;
				for(let i = 0; i < employee.messages.length; i++){
					if(employee.messages[i].from === from_email && employee.messages[i].isTrade === true && employee.messages[i].message === cur_message){
						employee.shifts[employee.messages[i].tradeWeekDay].start = employee.messages[i].tradeTime.start;
						employee.shifts[employee.messages[i].tradeWeekDay].end = employee.messages[i].tradeTime.end;
						employee.shifts[employee.messages[i].tradeWeekDay].duration = employee.messages[i].tradeTime.duration;
						list_cpy.splice(i, 1);
						flag = true;
						break;
					}
				}
				//not find same from email
				if(flag === false){
					res.status(500).send()
				}else{
					employee.messages = list_cpy;
				}
			}
			employee.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
		}
	}).catch((error) => res.status(500).send())

	// modify the flag on sent request people and modify
	Employee.findOne({ email: from_email }).then((employeeFrom) => {
		if(!employeeFrom){
			res.status(404).send()
		}else{
			if(employeeFrom.messages.length === 0){
				res.status(404).send()
			}else{
				for(let j = 0; j < employeeFrom.messages.length; j++){
					if(employeeFrom.messages[j].from === from_email && employeeFrom.messages[j].isTrade === true && employeeFrom.messages[j].message === cur_message){
						employeeFrom.messages[j].tradeResponse = 'A';
						employeeFrom.shifts[employeeFrom.messages[j].tradeWeekDay].start = null;
						employeeFrom.shifts[employeeFrom.messages[j].tradeWeekDay].end = null;
						employeeFrom.shifts[employeeFrom.messages[j].tradeWeekDay].duration = null;
						break;
					}
				}
			}}
			employeeFrom.save().then((result) => {
				res.send(result)
			}).catch((error) => res.status(500).send())
	}).catch((error) => res.status(500).send())
})

module.exports = router;