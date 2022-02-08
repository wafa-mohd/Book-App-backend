const express = require("express");
const router = express.Router();
const Auth = require("../../libs/auth");
const Order=require("../../models/Order")

router.get('/list',Auth.isAdminAuthorized,async(req,res)=>{
    let orders=await Order.find().populate('book').populate('user')
    res.json({orders})
})

router.post("/update-status/:orderId", Auth.isAdminAuthorized, (req, res) => {
    let {status} =req.body;
    let {orderId} = req.params;
    Order.findByIdAndUpdate(orderId,{status}).then(() => {
        return res.json({message: "Status updated!"})
    }).catch((err) => {
        return res.json({message: "Something went wrong!"})
    })
})


module.exports = router;
