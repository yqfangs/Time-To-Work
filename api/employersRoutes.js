const log = console.log;
const express = require('express');
const router = express.Router();
const { Employer } = require('../db/models/employer');

/** Routes in this file start at /api/employers */

router.get('/by_company/:company',  (req, res) => {
    const company = req.params.company
    Employer.find({
        companyName: company
    }).then(employers => {
        res.send(employers)
    }).catch(err => {
        res.status(404).send(err)
    })
})

router.patch('/email/:email', (req, res) => {
    const email = req.params.email
    const mode = req.body.mode
    const employer = req.body.user
    if (mode === "DELETE") {
        Employer.deleteOne({
            email: email
        }, (err, doc) => {
            if (err) res.status(500).send(err)
            else if (doc.deletedCount === 0) res.status(400).send(err)
            else res.send(doc)
        })
    } else if (mode === "SAVE") {
        Employer.findOneAndUpdate({
            email: email
        }, 
        employer, 
        (err, doc) => {
            if (!doc) res.status(500).send(err)
            else res.send(doc)
        })
    }

})

router.get('/email/:email', (req, res) =>{
    const email = req.params.email
    Employer.findOne({
        email: email
    },(err, employer) => {
        if (err) res.status(404).send(err)
        else res.send(employer)
    })
})

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
