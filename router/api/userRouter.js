const express = require('express');
const router = express.Router();
const { check,validationResult } = require('express-validator');
const User = require('../../models/UserModel');
const gravatar = require('gravatar');
const bCrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

//@route    POST api/users
//@desc     Register router
//@access   Public
router.post('/',
    [
        check('name','Name is required').not().isEmpty(),
        check('email','Enter valid email').isEmail(),
        check('password','Enter valid passwod with atlest 6 chars').isLength({min:6})
    ],
    async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({
            errors:errors.array()
        })
    }
    //console.log(req.body);
    const { name,email,password } = req.body;

    try {
        //see use exists
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                errors:[{msg:'Users already exists'}]
            })
        }

        //get users gravatar
        const avatar = gravatar.url(email,{
            s:'200',
            r:'pg',
            d:'mm'
        })
        user = new User({
            name,
            email,
            password,
            avatar
        })

        //Encrypt pswd
        const sault = await bCrypt.genSalt(10);
        user.password = await bCrypt.hash(password,sault);
        await user.save();
        // res.send('User created');

        //return jwt
        const payload = {
            user : {
                id:user.id,
            }
        }
        jwt.sign(payload,config.get('jwtSecretKey'),{expiresIn:'24h'},(err,token)=>{
            if(err) throw err;
            res.json({token});
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;