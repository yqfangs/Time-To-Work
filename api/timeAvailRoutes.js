const log = console.log;
const express = require('express');
const router = express.Router();
const { Employee } = require('../db/models/employee')

/** Routes in this file start at /api/timeAvail */
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
  
  // router.get('/:email', (req, res) => {
  //   const email = req.params.email
  //   Employee.findOne({email: email}).then((employee) => {
  //     if (!employee) {
  //       res.status(404).send()
  //     }
  //     else {
  //       res.send(employee)
  //     }
  //   }).catch((error) => {
  //     res.status(500).send()
  //   })
  // })
  
  router.patch('/', (req, res) => {
    // const email = req.params.email
    if (req.session.user) {
      const newAvail = req.body.availability
      // check if new availability is valid
      if (!(server_helper.validate_avail(newAvail))) {
        res.status(400).send()
      }
      else {
        Employee.findOneAndUpdate({_id: req.session.user}, {$set: {availability: newAvail}}, {new: true}).then((employee) => {
          if (!employee) {
            log(req.session.user)
            res.status(404).send()
          }
          else {
            res.send({
              "new availability": newAvail,
              "employee": employee
            })
          }
        }).catch((error) => {
          log(error)
          res.status(500).send()
        })
      }
    }
    else {
      res.redirect('/login')
    }
  })
  
  
  // router.post('/:id', (req, res) =>{
  //     const id = req.params.id
  
  //     if(!ObjectID.isValid(id)){
  //         res.status(404).send()
  //     }
  
  //     const timeavail = {
  //         start: req.body.start,
  //         end: req.body.end,
  //         duration: req.body.start - req.body.end
  //     }
  
  //     mongoose.set("useFindAndModify", false)
  //     Employee.findByIdAndUpdate(id,
  //         {$push: {avaliability: timeavail}},
  //         {new: true}).then((employee) => {
  //         if(!employee){
  //             res.status(404).send()
  //         } else{
  //             res.send({timeavail, employee})
  //         }
  //     }).catch((error)=>{
  //         res.status(500).send()
  //     })
  
  // })

module.exports = router;