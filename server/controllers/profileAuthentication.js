const Profile=require('../model/profile');
const {validateProfileData}=require('../utils/profileValidator');

const CreateProfile=async (req,res)=>{
    try{ 
        validateProfileData(req.body);
        console.log(validateProfileData);
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
}catch (error) {
   return res.status(400).json({
      message: error.message
   });
}
};
const getMyProfile = async (req, res) => {

   try {


      const user = req.result;
      console.log(user);
      const profile = await Profile.findOne({
        user:user._id
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

const getProfile=async(req,res)=>{
    try{
        const profile=await Profile.findOne({
            username:req.params.username
        })
           if (!profile) {

         return res.status(404).json({
            message: 'Profile not found'
         });

      }

      res.status(200).json(profile);

    } catch(error){
        res.status(500).json({
            message:error.message
        })
    }
}
const updateProfile = async (req, res) => {

   try {

      const {
         bio,
         skills,
         company,
         location,
         socials
      } = req.body;

      const user = req.result;

      const updatedProfile =
         await Profile.findOneAndUpdate(

            { user: user._id },

            {
               bio,
               skills,
               company,
               location,
               socials
            },

            {
               new: true
            }

         );

      if (!updatedProfile) {

         return res.status(404).json({
            message: 'Profile not found'
         });

      }

      res.status(200).json(updatedProfile);

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};
const deleteProfile = async (req, res) => {

   try {

      const user = req.result;

      const profile = await Profile.findOneAndDelete({
         user: user._id
      });

      if (!profile) {

         return res.status(404).json({
            message: 'Profile not found'
         });

      }

      res.status(200).json({
         message: 'Profile deleted successfully'
      });

   } catch (error) {

      res.status(500).json({
         message: error.message
      });

   }

};
module.exports={CreateProfile,getMyProfile,getProfile,updateProfile,deleteProfile};