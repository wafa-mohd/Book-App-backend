const jwt = require("jsonwebtoken");
const User=require('../models/User')
const Admin= require('../models/Admin')

module.exports = {
    isAuthorized: (req, res, next) => {

        if (!req.headers.authorization) {
            return res.status(401).json({message:"Auth failed!"})
        }
        let token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.JWT_SECRET_KEY, async function(err, decoded) {
            if (err) {
                console.log('Error',err);
                return res.status(401).json({message:"Auth failed! from middleware"})
            }
            console.log(decoded)
            let user = await User.findById(decoded.userId)
            req.user = user;
            return next();
        });
    },

    isAdminAuthorized: (req, res, next) => {

        
        if (!req.headers.authorization) {
            return res.status(401).json({message:"Auth failed!"})
        }
        
        let token = req.headers.authorization.replace('Bearer ', '')
        jwt.verify(token, process.env.ADMIN_SECRET_KEY, async function(err, decoded) {
            if (err) {
                console.log('Error',err);
                return res.status(401).json({message:"Auth failed! from middleware"})
            }
            console.log(decoded)
            let admin = await Admin.findById(decoded.adminId)
            req.admin = admin;
            return next();
        });
    }

}
