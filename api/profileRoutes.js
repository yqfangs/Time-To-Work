const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { Employer } = require('../db/models/employer')
const { ObjectID } = require('mongodb')

router.get('/', (req, res) =>{
    if (req.session.user) {
        const id = req.session.user
        if(!ObjectID.isValid(id)){
            res.status(404).send()
        }
        
        if(req.session.type == "employee"){
            Employee.findById(id).then((employee) =>{
            if(!employee){
                res.status(404).send()
            } else{
                const type = "employee"
                res.send({ employee, type })
            }
            }).catch((error)=>{
                res.status(500).send()
            })
        }else if(req.session.type == "employer"){
            Employer.findById(id).then((employer) =>{
            if(!employer){
                res.status(404).send()
            } else{
                const type = "employer"
                res.send({employer, type})
            }
            }).catch((error)=>{
                res.status(500).send()
            })
        }
    }else{
        res.redirect('/login');
    }
})

router.patch('/', (req, res) => {

    log(req.body)
    if (req.session.user) {
        const id = req.session.user
        if(!ObjectID.isValid(id)){
            res.status(404).send()
        }
        if(req.session.type == "employee"){
            Employee.findById(id).then((employee) => {
                if(!employee){
                    res.status(404).send()
                }
                else{
                    employee.password = req.body.password

                    employee.save().then((employee)=>{
                        const type = "employee"
                        res.send({ employee, type })
                    }, (error) => {
                        res.status(400).send(error)
                    })
                }
            }).catch((error)=>{
                res.status(500).send()
            })
        }else if(req.session.type == "employer"){
            Employer.findById(id).then((employer) => {
                if(!employer){
                    res.status(404).send()
                }
                else{
                    employer.password = req.body.password

                    employer.save().then((employer)=>{
                        const type = "employer"
                        res.send({ employer, type })
                    }, (error) => {
                        res.status(400).send(error)
                    })
                }
            }).catch((error)=>{
                res.status(500).send()
            })
        }
    }else{
        res.redirect('/login')
    }
})


module.exports = router;