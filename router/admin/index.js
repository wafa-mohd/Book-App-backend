const express = require("express");
const router = express.Router();
const Auth = require('../../libs/auth')

router.use('/',require('./admin'))
router.use('/books', require('./book'))
router.use('/category', require('./category'))
router.use('/sub-category', require('./subCategory'))
router.use('/orders', require('./order'))

router.post('/upload', Auth.isAdminAuthorized ,(req, res) => {
    console.log(req.files);
  
    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ message: 'No files were uploaded.'});
    }
  
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let imageFileName = Date.now().toString() //req.files.image;
    let fileName = imageFileName + '.' + req.files.image.name.split('.').pop()
    uploadPath =  'uploads/' + fileName;
  
    // Use the mv() method to place the file somewhere on your server
    req.files.image.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
  
      res.json({ message: 'File uploaded!', file: fileName});
    });
})

module.exports = router