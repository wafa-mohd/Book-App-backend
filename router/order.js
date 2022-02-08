const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const Auth = require("../libs/auth");
const Book = require("../models/Book");
const Order = require("../models/Order");

router.post("/place", Auth.isAuthorized, async(req, res) => {
  body('deliveryAddress').exists().withMessage("address is required")
  let { bookId,name,mobileNumber,email,deliveryAddress, quantity } = req.body;
  let book = await Book.findById(bookId);
  let totalAmount = quantity * book.amount;
  Order.create({
    name,
    mobileNumber,
    email,
    deliveryAddress,
    book: bookId,
    bookAmount: book.amount,
    quantity,
    totalAmount,
    user: req.user
  }).then(()=>{
    res.json({message:"Order placed"})
  }).catch(err=>{
      console.log("error",err);
      res.status(401).json({message:"Something went wrong"})
  })
});

router.get('/list',Auth.isAuthorized,async(req,res)=>{
    let orders=await Order.find({
        user: req.user
    })
    res.json({orders})
})


module.exports = router;
