const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')

const {CreateProfile,getMyProfile,getProfile,updateProfile}=require('../controllers/profileAuthentication');
console.log(updateProfile);
router.post('/create',userMiddleware,CreateProfile);
router.get('/me',userMiddleware,getMyProfile);
router.get('/:username',userMiddleware,getProfile);
router.put('/update',userMiddleware,updateProfile);
module.exports = router;