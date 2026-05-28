const Profile=require('../model/profile');

const CreateProfile=async (req,res)=>{
    console.log(req.body);
    const {
   username,
   bio,
   skills,
   company,
   location,
   socials
} = req.body;

const user = req.result;
const existingProfile = await Profile.findOne({
   user: user._id
});
if (existingProfile) {

   return res.status(400).json({
      message: 'Profile already exists'
   });

}
const profile = await Profile.create({

   user: user._id,

   username,
   bio,
   skills,
   company,
   location,
   socials

});
res.status(201).json(profile);
};
const getMyProfile = async (req, res) => {

   try {

      const user = req.result;

      const profile = await Profile.findOne({
         user: user._id
      });

      if (!profile) {

         return res.status(404).json({
            message: 'Profile not found'
         });

      }

      res.status(200).json(profile);

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};
module.exports={CreateProfile,getMyProfile};