const User=require('../model/user');
const jwt=require("jsonwebtoken");
const redis_client=require('../config/redis');
const userMiddleware=async(req,res,next)=>{
    try{
        const {token}=req.cookies;
        if(!token) throw new Error("token is not present");
        const payload=jwt.verify(token,process.env.JWT_SECRET);
        const {email}=payload;
        if(!email) throw new Error("  Invalid token");
        const result=await User.findOne({email});
        if(!result) throw new Error("User doesnot exist");
        const IsBlocked=await redis_client.exists(`token:${token}`);
        if(IsBlocked) throw new Error('Invalid token');
        req.result=result;
      
        // next();
    }
    catch(err){
       res.status(401).send('Error: '+err.message);
    }
};

module.exports=userMiddleware;