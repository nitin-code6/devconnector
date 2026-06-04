const express = require('express');
const upload = require("../config/multer");
const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')
const {register,login,logout,getMe,uploadAvatar}=require('../controllers/userAuthentication')

router.post('/register',register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/me', userMiddleware ,getMe);
router.post("/avatar",userMiddleware,upload.single("avatar"),uploadAvatar);
module.exports = router;