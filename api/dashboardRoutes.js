const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')
const { ObjectID } = require('mongodb')

router.get('/', (req, res) =>{
    if (req.session.user) {
        const id = req.session.user
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
    }else{
        res.redirect('/login');
    }

})


module.exports = router;