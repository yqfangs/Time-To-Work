const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { ObjectID } = require('mongodb')

/** Routes in this file start at /api/employees
 *  (eg. '/' here will be '/api/employees' )
 */
router.get('/by_company/:company',  (req, res) => {
    const company = req.params.company
    Employee.find({
        companyName: company
    }).then(employees => {
        res.send(employees)
    }).catch(err => {
        res.status(404).send(err)
    })
})

router.patch('/email/:email', (req, res) => {
    const email = req.params.email
    const mode = req.body.mode
    const employee = req.body.user
    if (mode === "DELETE") {
        Employee.deleteOne({
            email: email
        }, (err, doc) => {
            if (err) res.status(500).send(err)
            else if (doc.deletedCount === 0) res.status(400).send(err)
            else res.send(doc)
        })
    } else if (mode === "SAVE") {
        Employee.findOneAndUpdate({
            email: email
        }, 
        employee, 
        (err, doc) => {
            if (!doc) res.status(500).send(err)
            else res.send(doc)
        })
    }

})

router.get('/email/:email', (req, res) =>{
    const email = req.params.email
    Employee.findOne({
        email: email
    },(err, employee) => {
        if (err) res.status(404).send(err)
        else res.send(employee)
    })
})

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
        // messagesSend: [{}],
        // messagesRecived: [{}]
    })

    // Save the Employee
    employee.save().then((employee) => {
        res.redirect('/login')
        // res.send(employee)
    }, (error) => {
        //res.redirect('/signup')
        //log('here')
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


// Should not be called normally
router.post('/_removeAll', (req, res) => {
    Employee.remove({}).then((r) => res.send(r)).catch((err)=> {res.status(500).send()})
})

module.exports = router;
