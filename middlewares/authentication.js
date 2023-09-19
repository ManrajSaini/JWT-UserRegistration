const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const authentication = async(req,res,next) => {
    const token = req.query.token;

    if(!token){
        const errorJson = {
            "success": false,
            "error_code": 404,
            "message": "Unauthorized User",
            "data": null
        };

        return res.render('error', {errorJson});
    }

    const tokenWithoutPrefix = token.replace("Bearer ", "");

    try{
        const user = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET_KEY);
        
        if(!user){
                const errorJson = {
                "success": false,
                "error_code": 404,
                "message": "Invalid Token",
                "data": null
            };

            return res.render('error', {errorJson});
        }

        req.user = user;
        next();

    } catch(err){
        const errorJson = {
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": null
        };

        return res.render('error', {errorJson});
    }
};

module.exports = {authentication};