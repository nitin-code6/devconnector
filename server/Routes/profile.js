const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')

const {CreateProfile,getMyProfile,getProfile,updateProfile,deleteProfile}=require('../controllers/profileAuthentication');
console.log(CreateProfile);
router.post('/create',userMiddleware,CreateProfile);
router.get('/me',userMiddleware,getMyProfile);
router.get('/:username',userMiddleware,getProfile);
router.put('/update',userMiddleware,updateProfile);
router.delete('/delete',userMiddleware,deleteProfile);
module.exports = router;