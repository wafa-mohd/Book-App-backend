const express = require("express");
const router = express.Router();
const Auth = require('../libs/auth');
const SubCategory = require("../models/SubCategory");

router.get('/list/byId/:id',async(req,res)=>{
    let {id}= req.params
    let subcategory= await SubCategory.find({category:id})
    res.json({ subcategory})
})

router.get('/list/website',async(req,res)=>{
    let subcategory= await SubCategory.find({showInWebsite: true})
    res.json({ subcategory})
})

module.exports=router
