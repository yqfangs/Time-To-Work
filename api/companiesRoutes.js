const log = console.log;
const express = require('express');
const router = express.Router();
const { Company } = require('../db/models/company')

/** Routes in this file start at /api/companies */
router.post('/', (req, res) => {
    log(req.body)

    // Create a new Company
    const company = new Company({
        name: req.body.name,
        openHours: req.body.openHours
    })

    // Save the Company
    company.save().then((company) => {
        res.send(company)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

router.get('/:id', (req, res) =>{
    const id = req.params.id

    if(!ObjectID.isValid(id)){
        res.status(404).send()
    }

    Company.findById(id).then((company) =>{
        if(!company){
            res.status(404).send()
        } else{
            res.send(company)
        }
    }).catch((error)=>{
        res.status(500).send()
    })
})

module.exports = router;
