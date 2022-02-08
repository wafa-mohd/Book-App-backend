const express = require("express");
const router = express.Router();
const Book = require('../models/Book')
const Auth = require("../libs/auth");
const SubCategory = require("../models/SubCategory");

router.get("/list", async(req, res) => {
    let {category,subCategory} = req.query;
    let conditions = { isActive: true }
    if (category) {
        conditions.category = category
    }
    if (subCategory){
        conditions.subCategory=subCategory
    }
        
    let book= await Book.find(conditions)
    res.json({book})
  })

router.get('/category/:categoryId', async (req, res) => {
    let {categoryId} = req.params.categoryId
    let books = await Book.find({category: categoryId}).populate('category')
    return res.json({books})
    // res.json
})

router.get('/subCategory/:subCategoryId', async (req, res) => {
    let {subCategoryId} = req.params
    let books = await Book.find({subCategory:subCategoryId}).populate('subCategory')
    return res.json({books})
})

router.get('/byId/:bookId',async(req,res)=>{
    let book = await Book.findById(req.params.bookId)
    res.json({book})
})

module.exports = router;
