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

module.exports = {
   createPost
};