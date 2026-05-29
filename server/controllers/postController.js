const Post = require('../model/Post');

const createPost = async (req, res) => {

   try {

      const { content } = req.body;
      if (!content) {
         return res.status(400).json({
            message: 'Content is required'
         });

      }

      const user = req.result;
     const post = new Post();
    post.user = user._id;
     post.content = content;
     await post.save();
      res.status(201).json(post);
   }
   catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

};
const getPosts = async (req, res) => {

   try {

      const posts = await Post.find()
         .sort({ createdAt: -1 });

      res.status(200).json(posts);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

};
const getPost = async (req, res) => {

   try {

      const post = await Post.findById(
         req.params.id
      );

      if (!post) {

         return res.status(404).json({
            message: "Post not found"
         });

      }

      res.status(200).json(post);

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

};
const deletePost = async (req, res) => {

   try {

      const user = req.result;

      const post = await Post.findById(
         req.params.id
      );

      if (!post) {

         return res.status(404).json({
            message: "Post not found"
         });

      }

      // Ownership Check
      if (
         post.user.toString() !==
         user._id.toString()
      ) {

         return res.status(403).json({
            message: "Not authorized"
         });

      }

      await post.deleteOne();

      res.status(200).json({
         message: "Post deleted"
      });

   } catch (err) {

      res.status(500).json({
         message: err.message
      });

   }

};
module.exports = {
   createPost,getPosts,getPost,deletePost
};