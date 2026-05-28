const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')

const {CreateProfile,getMyProfile,getProfile}=require('../controllers/profileAuthentication');
console.log(getProfile);
router.post('/create',userMiddleware,CreateProfile);
router.get('/me',userMiddleware,getMyProfile);
router.get('/:username',userMiddleware,getProfile);
module.exports = router;