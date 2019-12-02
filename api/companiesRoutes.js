const log = console.log;
const express = require('express');
const router = express.Router();
const { Company } = require('../db/models/company')
const { ObjectID } = require('mongodb')
const { TimeInterval } = require('../db/models/timeInterval')

/** Routes in this file start at /api/companies */
router.post('/', (req, res) => {
    const interval = new TimeInterval(
        {
            start: req.body.start,
            end: req.body.end
        }
    )

    // Create a new Company
    const company = new Company({
        name: req.body.name,
        openHours: interval
    })

    // Save the Company
    company.save().then((company) => {
        res.send(company)
    }, (error) => {
        res.status(400).send(error) // 400 for bad request
    })
})

router.get('/all', (req, res) => {
    Company.find({}).then( companies => { res.send(companies)
    }).catch((error) => {res.status(500).send()})
})

// Should not be called
router.post('/_removeAll', (req, res) => {
    Company.remove({}).then((r) => res.send(r)).catch((err)=> {res.status(500).send()})
})

router.get('/:id', (req, res) =>{
    const id = ObjectID(req.params.id)

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
