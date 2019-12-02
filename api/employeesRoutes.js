const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')

/** Routes in this file start at /api/employees
 *  (eg. '/' here will be '/api/employees' )
 */
router.post('/', (req, res) => {

    // Create a new EMployee
    const employee = new Employee({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        phone: req.body.phone,
        companyName: req.body.companyName,
        availability: [{},{},{},{},{},{},{}],
        shifts: [{},{},{},{},{},{},{}]
    })

    // Save the Employee
    employee.save().then((employee) => {
        log('alright')
        res.redirect('/login')
        // res.send(employee)
    }, (error) => {
        //res.redirect('/signup')
        log(error)
        res.status(400).redirect('/signup') // 400 for bad request
    })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Employee.findById(id).then((employee) =>{
        if(!employee){
            res.status(404).send()
        } else{
            res.send(employee)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})

// router.get('/:id/message', (req, res) =>){
//     const id = req.params.id

//     if(!ObjectID.isValid(id)){
//         res.status(404).send()
//     }

//     Message.find().then((messages) =>{
//         const allMessages = messages;
//         allMessages.filter()

//     })
// }

module.exports = router;