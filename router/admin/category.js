const express = require("express");
const router = express.Router();
const Auth = require('../../libs/auth');
const Category = require("../../models/Category");
const CategoryModel=require('../../models/Category')

// Category.updateMany({},{isActive: true}).then(() => console.log('yesssssssss')).catch((err) => console.log('err',err))

router.post("/add",Auth.isAdminAuthorized,(req,res)=>{
    let {name}=req.body
    CategoryModel.create({
       name,
    }).then(()=>{
        res.json("category created")
    }).catch((err)=>{
        res.status(401).json("Something went wrong",err)
    })
})

router.get('/list',Auth.isAdminAuthorized,async(req,res)=>{
    let category= await CategoryModel.find({isActive: true})
    res.json({list: category})

})

router.get('/id/:id',Auth.isAdminAuthorized,async(req,res)=>{
    let {id} = req.params
    let category= await CategoryModel.findById(id)
    res.json({category})

})

router.put('/update/:categoryId',Auth.isAdminAuthorized,async(req,res)=>{
    let{name}=req.body
    let category = await Category.findOne({
        _id: req.params.categoryId,
    })
    if (!category) {
        return res.status(404).json({
            message: "category not found!"
        })
    }
    if (name) {
        category.name= name
    }
    category.save().then(() => {
        return res.json({
            message: "Category updated!"
        })
    }).catch(err => {
        console.log('Error ', err);
        return res.status(403).json({
            message: "Something went wrong!"
        })
    })
})

router.delete("/remove/:id", (req, res) => {
    let {id} = req.params
    Category.findByIdAndUpdate(id, {isActive: false})
        .then(() => {
            res.json({message: "Category removed!"})
        }).catch((err) => {
            console.log('Error ', err);
            return res.status(403).json({
                message: "Something went wrong!"
            })
        })
})

module.exports = router