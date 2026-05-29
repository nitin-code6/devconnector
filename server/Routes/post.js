const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')
const {createPost,getPosts,getPost,deletePost,likePost}=require('../controllers/postController');

router.post('/',userMiddleware,createPost);
router.get('/',userMiddleware,getPosts);
router.get('/:id',userMiddleware,getPost);
router.delete('/:id',userMiddleware,deletePost);
router.put('/:id',userMiddleware,likePost);
module.exports = router;