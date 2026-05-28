const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')

const {CreateProfile,getMyProfile}=require('../controllers/profileAuthentication');
console.log(CreateProfile);
router.post('/create',userMiddleware,CreateProfile);
router.get('/me',userMiddleware,getMyProfile);
module.exports = router;