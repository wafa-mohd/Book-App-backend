const express = require("express");
const router = express.Router();
const Auth = require('../libs/auth');
const Category = require("../models/Category");

router.get('/list',async(req,res)=>{
    let category= await Category.find({isActive:true})
    res.json({category})

})

router.get('/byId/:id',async(req,res)=>{
   let {id} = req.params
   let category= await Category.findById(id)
   res.json({category})
})
module.exports=router
