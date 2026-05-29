const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')
const {register,login,logout,getMe}=require('../controllers/userAuthentication')

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me', userMiddleware ,getMe);
module.exports = router;