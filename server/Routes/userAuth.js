const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')
const {register,login,logout,getMe}=require('../controllers/userAuthentication')
console.log(userMiddleware);
console.log(getMe)
router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me', userMiddleware ,getMe);
module.exports = router;