const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/UserModel');
const { check,validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const config = require('config');
const bCrypt = require('bcryptjs');

//@route    GET api/auth
//@desc     Test router
//@access   private
router.get('/',auth,async (req,res)=>{
    try {
        
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

//@route    POST api/auth
//@desc     Authenticate user & get token
//@access   Public
router.post('/',
    [
        check('email','Enter valid email').isEmail(),
        check('password','Enter password').exists()
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //console.log(req.body);
    const { email,password } = req.body;

    try {
        //see use exists
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({
                errors:[{msg:'Invalid credentials'}]
            })
        }

        const isMatch = await bCrypt.compare(password,user.password);
        if(!isMatch) {
            return res.status(400).json({
                errors:[{msg:'Invalid credentials'}]
            })
        }

        //return jwt
        const payload = {
            user : {
                id:user.id,
            }
        }
        jwt.sign(payload,config.get('jwtSecretKey'),{expiresIn:360000},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;