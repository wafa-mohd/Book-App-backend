const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload');
require('dotenv').config()
const cors = require('cors')
const app = express()

mongoose.connect('mongodb://localhost:27017/book-seller');

require('./models/User')

app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/uploads'
}));

app.use('/images', express.static('uploads'))

app.use(cors())
app.use(bodyParser.json())
app.use('/user',require('./router/user'))
app.use('/admin',require('./router/admin/index'))
app.use('/book', require('./router/book'))
app.use('/order',require('./router/order'))
app.use('/category', require('./router/category'))
app.use('/sub-category',require('./router/subCategory'))

app.get('/', function (req, res) {
  res.send('Hello World!')
})



app.listen(process.env.PORT, () => {
  console.log('App is running!');
})