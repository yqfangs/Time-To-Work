const multer = require('multer');
const path = require('path');
const fs = require('fs');
const express = require('express');
const router    = express.Router();
const mongoose  = require('mongoose');
const Pic = require('../db/models/profilepic.js')
const log = console.log

/*** Storage for file **************************************/
const storage = multer.diskStorage({
  destination: './public/img/',
  filename: (req, file, cb)=>{
    cb(null,file.fieldname + '-' + Date.now() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits:{fileSize: 10000000},
  fileFilter: (req, file, cb)=>{
    filterFile(file, cb);
  }
}).single('myImg');

// Check File Type
function filterFile(file, cb){
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype){
    return cb(null,true);
  } else {
    cb('Error: Invalid File Format. Should be uploading picture only');
  }
}

router.get('/', (req, res) =>{
	Pic.find({
		creator: req.session.user 
	}).then((pics) =>{
		const index = pics.length - 1
		res.send(pics[index])
	}, (error) =>{
		res.status(500).send(error)
	})

})

router.post('/', (req, res) =>{
  upload(req, res, (error) => {
    if(error){
      return Promise.reject("")
    } else {
      if(req.file == undefined){
        res.render('profile', {
          msg: 'Error: No File Selected!'
        })
      } else {

        const path = "img/" + req.file.filename
        const file = {
        	path: path,
        	creator: req.session.user
        }
        const profilepic = new Pic(file); 
        profilepic.save((error) => {
            if(error){ 
             	res.send(error)
            } 
            res.redirect('/profile')
         })

      }
    }
  })
})

module.exports = router;