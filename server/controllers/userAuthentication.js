const User=require('../model/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
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
        console.log(typeof password);
      if(!email) throw new Error("Invalid Credentials");
    if(!password) throw new Error("Invalid Credentials");
    const user = await User.findOne({ email});
    if (!user) {
 throw new Error("Invalid Credentials");
   }
   console.log(user);
   const Match=await bcrypt.compare(password,user.password);
   console.log(Match);
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

   try {

      res.clearCookie('token');

      res.status(200).json({
         message: 'Logout successful'
      });

   } catch (error) {

      res.status(500).json({
         message: 'Server Error'
      });

   }

};

module.exports = {register,login,logout};