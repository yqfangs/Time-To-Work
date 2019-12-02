const log = console.log;
const express = require('express');
const router = express.Router();
const { Employer } = require('../db/models/employer');

/** Routes in this file start at /api/employers */
router.post('/', (req, res) => {
    log(req.body)

    // Create a new Employer
    const employer = new Employer({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        companyName: req.body.companyName
    })

    // Save the Employer
    employer.save().then((employer) => {
        res.send(employer)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Employer.findById(id).then((employer) =>{
        if(!employer){
            res.status(404).send()
        } else{
            res.send(employer)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})

module.exports = router;
