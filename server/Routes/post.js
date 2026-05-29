const express = require('express');

const router = express.Router();
const userMiddleware=require('../Middleware/UserMiddleware')
const {createPost,getPosts,getPost,deletePost,likePost,unlikePost,addComment,deleteComment}=require('../controllers/postController');

router.post('/',userMiddleware,createPost);
router.get('/',userMiddleware,getPosts);
router.get('/:id',userMiddleware,getPost);
router.delete('/:id',userMiddleware,deletePost);
router.put('/like/:id',userMiddleware,likePost);
router.put('/unlike/:id',userMiddleware,unlikePost);
router.put('/comment/:id',userMiddleware,addComment);
router.delete('/:postId/:commentId',userMiddleware,deleteComment);
module.exports = router;