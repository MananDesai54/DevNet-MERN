const express = require('express');
const router = express.Router();
const Profile = require('../../models/profileModel');
const User = require('../../models/UserModel');
const auth = require('../../middleware/auth');
const { check,validationResult } = require('express-validator');
const config = require('config');
const request = require('request');
const { response } = require('express');

//@route    GET api/profile/me
//@desc     get user profile
//@access   private
router.get('/me',auth,async (req,res)=>{
    try {
        
        const profile = await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile) {
            return res.status(400).json({ msg:'Profile not found' });
        }
        return res.json(profile);

    } catch (error) {
        console.error(error.message);
        return res.status(500).send('Server error');
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
            return res.status(400).json({errors:error.array()})
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
            return res.status(500).send('Server Error');
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

//@route PUT api/profile/experience
//@desc add user experience
//@access private
router.put('/experience',[
    auth,
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From is required').not().isEmpty()
],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()) {
        console.log('Validaion error');
        res.status(400).json({msg:error.array()});
    }

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }

    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp);
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'Server Error'});
    }
})

//@route DELETE api/profile/experience/:experience_id
//@desc add user experience
//@access private
router.delete('/experience/:experience_id',auth,async (req,res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        const removeIndex = profile.experience.map(exp=>exp.id).indexOf(req.params.experience_id);
        profile.experience.splice(removeIndex,1);
        profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'Server Error'});
    }
})

//@route PUT api/profile/experience/:experience_id
//@desc Edit user experience
//@access private
router.put('/experience/:experience_id',auth,async (req,res)=>{

    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {};

    if(title) newExp.title = title;
    if(company) newExp.company = company;
    if(location) newExp.location = location;
    if(from) newExp.from = from;
    if(to) newExp.to = to;
    if(current) newExp.current = current;
    if(description) newExp.description = description;

    try {
        const profile = await Profile.findOne({user:req.user.id});
        const expIndex = profile.experience.map(exp=>exp.id).indexOf(req.params.experience_id);
        for(let key of Object.keys(newExp)) {
            profile.experience[expIndex][key] = newExp[key];
        }
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'Server Error'});
    }
})

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
router.put(
    '/education',
    [
      auth,
      [
        check('school', 'School is required').not().isEmpty(),
        check('degree', 'Degree is required').not().isEmpty(),
        check('fieldofstudy', 'Field of study is required').not().isEmpty(),
        check('from', 'From date is required and needs to be from the past')
          .not()
          .isEmpty()
          .custom((value, { req }) => (req.body.to ? value < req.body.to : true))
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      } = req.body;
  
      const newEdu = {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
      };
  
      try {
        const profile = await Profile.findOne({ user: req.user.id });
  
        profile.education.unshift(newEdu);
  
        await profile.save();
  
        res.json(profile);
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
    }
  );
  
  // @route    DELETE api/profile/education/:edu_id
  // @desc     Delete education from profile
  // @access   Private
  
  router.delete('/education/:edu_id', auth, async (req, res) => {
    try {
      const foundProfile = await Profile.findOne({ user: req.user.id });
      foundProfile.education = foundProfile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
      );
      await foundProfile.save();
      return res.status(200).json(foundProfile);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: 'Server error' });
    }
  });

//@route PUT api/profile/education/:edu_id
//@desc Edit user eduvation
//@access private
router.put('/education/:edu_id',auth,async (req,res)=>{

    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    } = req.body;

    const newedu = {};

    if(school) newedu.school = school;
    if(degree) newedu.degree = degree;
    if(fieldofstudy) newedu.fieldofstudy = fieldofstudy;
    if(from) newedu.from = from;
    if(to) newedu.to = to;
    if(current) newedu.current = current;
    if(description) newedu.description = description;

    try {
        const profile = await Profile.findOne({user:req.user.id});
        const expIndex = profile.education.map(exp=>exp.id).indexOf(req.params.edu_id);
        for(let key of Object.keys(newedu)) {
            profile.education[expIndex][key] = newedu[key];
        }
        await profile.save();
        res.json(profile);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({msg:'Server Error'});
    }
})

//@route GET api/profile/github/:username
//@desc get github repo from profile
//@access public
router.get('/github/:username',async (req,res)=>{
    try {
        const options = {
            uri:`https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=updated`,
            // &client_id=${config.get('githubClientID')}&client_secret=${config.get('githubSecret')}
            method:'GET',
            headers : { 'user-agent' : 'node.js' }
        }
        request(options,(error,response,body)=>{
            if(error) return error
            if(response.statusCode !== 200) {
                return res.status(404).json({msg:'Not found'});
            }
            res.json(JSON.parse(body))
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

module.exports = router;