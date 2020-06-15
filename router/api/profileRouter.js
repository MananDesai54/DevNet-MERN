const express = require('express');
const router = express.Router();
const Profile = require('../../models/profileModel');
const User = require('../../models/UserModel');
const auth = require('../../middleware/auth');
const { check,validationResult } = require('express-validator');

//@route    GET api/profile/me
//@desc     get user profile
//@access   private
router.get('/me',auth,async (req,res)=>{
    try {
        
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile) {
            res.status(400).json({ msg:'Profile not found' });
        }
        res.json(profile);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


//@route POST api/profile/
//@desc create user profile
//@access private
router.post('/',[
        auth,
        check('status','Status is required')
            .not()
            .isEmpty(),
        check('skills','Skills are required')
            .not()
            .isEmpty()
    ],async (req,res)=>{
        const error = validationResult(req);
        if(!error.isEmpty()) {
            res.status(400).json({error:error.array()})
        }

        const { company,
                website,
                location,
                bio,
                status,
                githubusername,
                skills,
                youtube,
                facebook,
                instagram,
                twitter,
                linkedin } = req.body;
        
        //building profile fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if(company) profileFields.company = company;
        if(website) profileFields.website = website;
        if(location) profileFields.location = location;
        if(bio) profileFields.bio = bio;
        if(status) profileFields.status = status;
        if(githubusername) profileFields.githubusername = githubusername;
        if(skills){
             profileFields.skills = skills.split(',').map(skill=>skill.trim());
        }

        //building profile skills field
        profileFields.social = {};
        if(youtube) profileFields.social.youtube = youtube;
        if(facebook) profileFields.social.facebook = facebook;
        if(instagram) profileFields.social.instagram = instagram;
        if(twitter) profileFields.social.twitter = twitter;
        if(linkedin) profileFields.social.linkedin = linkedin;

        try {
            
            let profile = await Profile.findOne({user:req.user.id});

            if(profile) {
                //update
                profile = await Profile.findOneAndUpdate(
                    {user:req.user.id},
                    {$set:profileFields},
                    {new:true}
                )
                return res.json(profile);
            }
            
            //create
            profile = new Profile(profileFields);
            await profile.save();
            return res.json(profile);

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server Error');
        }
})

//@route GET api/profile/
//@desc get all profile
//@access public
router.get('/',async (req,res)=>{
    try{
        const profile = await Profile.find().populate('user',['name','avatar']);
        res.json(profile);
    }catch(error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route GET api/profile/user/:user_id
//@desc get user by profile
//@access public
router.get('/user/:user_id',async (req,res)=>{
    try{
        const profile = await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        
        if(!profile) {
            res.status(400).json({msg:'No profile found'})
        }
        res.json(profile);
    }catch(error) {
        console.error(error.message);
        if(error.kind === 'ObjectId') {
            res.status(400).send('Profile not found');
        }
        res.status(500).send('Server error');
    }
})

//@route DELETE api/profile
//@desc delete user & profile
//@access private
router.delete('/',auth,async (req,res)=>{
    try {
        
        await Profile.findOneAndDelete({user:req.user.id});
        await User.findOneAndDelete({_id:req.user.id});

        res.send('User deleted');

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Servar Error');
    }
})



module.exports = router;