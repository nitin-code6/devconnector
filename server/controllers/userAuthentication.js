const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const redis_client = require('../config/redis');
const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    req.body.password=await bcrypt.hash(password, 10);

    const existingUser= await User.findOne({ email });
    if (existingUser) {
        res.json("User already exists");
    }
    const user = await User.create(req.body);
//    console.log(user);
  const token=  jwt.sign({
     id:user._id,
     email:user.email
     }, process.env.JWT_secret, { expiresIn: '1h' });
     res.cookie('token', token,{
   maxAge: 60 * 60 * 1000
});
    res.json("User registered successfully");
    
    // console.log(token);
}
const login=async(req,res)=>{

    const {email,password}=req.body;
        // console.log(typeof password);
      if(!email) throw new Error("Invalid Credentials");
    if(!password) throw new Error("Invalid Credentials");
    const user = await User.findOne({ email});
    if (!user) {
 throw new Error("Invalid Credentials");
   }
   console.log(user);
   const Match=await bcrypt.compare(password,user.password);
//    console.log(Match);
   if(!Match) throw new Error("Invalid Credentials");
    const token=  jwt.sign({
     id:user._id,
     email:user.email
     }, process.env.JWT_secret, { expiresIn: '1h' });
     res.cookie('token', token,{
   maxAge: 60 * 60 * 1000
});
    res.json("LoggedIn successfully");
}
const logout = async (req, res) => {
//  console.log("req",req);
    // console.log("req.cookies",req.cookies);
       const {token}=req.cookies;
        const payload=jwt.decode(token);
        // console.log("token",token);
        // console.log("payload",payload);
        await redis_client.set(`token:${token}`,"Blocked");
        await redis_client.expireAt(`token:${token}`,payload.exp);
          res.clearCookie('token');
        res.send("logged out Successfully");

   

};
const getMe=async(req,res)=>{
   try{
  const user=req.result;
  
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    res.status(200).send({
      name: user.name,
     email: user.email,
    });
   }
   catch (err) {
    res.status(401).send("Error: " + err.message);
  }
};

module.exports = {register,login,logout,getMe};