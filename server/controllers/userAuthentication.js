const User=require('../model/user');
const bcrypt=require('bcrypt');

const register = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }
    req.body.password=await bcrypt.hash("password", 10);
    const existingUser= await User.findOne({ email });
    if (existingUser) {
        res.json("User already exists");
    }
    const user = await User.create(req.body);
    res.json("User registered successfully");
}

module.exports = register;