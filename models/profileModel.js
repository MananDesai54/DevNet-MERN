const mongoose = require('mongoose');

const ProfileModel = new mongoose.Schema({
    user : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    },
    company : {
        type:String
    },
    website : {
        type:String
    },
    location : {
        type:String
    },
    status : {
        type:String,
        required:true
    },
    skills : {
        type:[String],
        required:true
    },
    bio : {
        type:String
    },
    githubusername : {
        type:String
    },
    company : {
        type:String
    },
    experience :[
        {
            title :{
                type:String,
                required:true
            },
            company :{
                type:String,
                required:true
            },
            location :{
                type:String,
            },
            from :{
                type:String,
                required:true
            },
            to : {
                type:String
            },
            current : {
                type:Boolean,
                default:false
            },
            description : {
                type:String
            },
        }
    ],
    education : [
        {
            school: {
                type:String,
                required:true
            },
            degree: {
                type:String,
                required:true
            },
            fieldofstudy: {
                type:String,
                required:true
            },
            from: {
                type:String,
                required:true
            },
            to: {
                type:String,
            },
            current: {
                type:Boolean,
                default:false
            },
            description: {
                type:String,
            },
        },
    ],
    social : {
        youtube : {
            type:String
        },
        linkedin : {
            type:String
        },
        twitter : {
            type:String
        },
        instagram : {
            type:String
        },
        facebook : {
            type:String
        },
    },
    date : {
        type:Date,
        default: Date.now()
    }
})


module.exports = Profile = mongoose.model('profile',ProfileModel);