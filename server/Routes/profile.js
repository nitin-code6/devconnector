const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')

const {CreateProfile}=require('../controllers/profileAuthentication');
console.log(CreateProfile);
router.post('/create',userMiddleware,CreateProfile);

module.exports = router;