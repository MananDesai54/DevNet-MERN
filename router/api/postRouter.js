const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check,validationResult } = require('express-validator');
const Post = require('../../models/postModel');
const Profile = require('../../models/profileModel');
const User = require('../../models/UserModel');

//@route    POST api/posts
//@desc     create post
//@access   Private
router.post('/',[auth,[
    check('text','Text is required').not().isEmpty(),
]],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({msg:error.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-passwod');

        const newPost = new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        });

        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    GET api/posts/
//@desc     get all post
//@access   Private
router.get('/',auth,async (req,res)=>{
    try {
        const posts = await Post.find().sort({date:-1});
        res.json(posts);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error');
    }
})

//@route    GET api/posts/:post_id
//@desc     get post
//@access   Private
router.get('/:post_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        return res.json(post);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    POST api/posts/:post_id
//@desc     update post
//@access   Private
router.post('/:post_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'User not authorised'});
        }
        const {
            text
        } = req.body;
        if(text) {
            post.text = text;
            post.save();
        }
        return res.json(post);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


//@route    DELETE api/posts/:post_id
//@desc     delete post
//@access   Private
router.delete('/:post_id',auth,async (req,res)=>{
    try {
        const post =  await Post.findById(req.params.post_id);

        if(!post) {
            console.log('Hello');
            return res.status(404).json({msg:'Post not found'});
        }

        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'User not authorised'});
        }else {
            await post.remove();
            return res.json({msg:'Post removed'});
        }
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    PUT api/posts/like/:post_id
//@desc     like post
//@access   Private
router.put('/like/:post_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        const likeUser = post.likes.find(like=>like.user.toString()===req.user.id);
        // console.log(likeUser)
        if(likeUser) {
            return res.status(400).json({msg:'Cannot like multiple times'})
        }
        post.likes.unshift({
            user:req.user.id
        })
        await post.save();
        return res.json(post.likes);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    PUT api/posts/unlike/:post_id
//@desc     unlike post
//@access   Private
router.put('/unlike/:post_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        const likeUser = post.likes.filter(like=>like.user.toString()===req.user.id);
        // console.log(likeUser)
        if(likeUser.length===0) {
            return res.status(400).json({msg:'You have not like this yes'})
        }

        const index = post.likes.findIndex(like=>like.user.toString()===req.user.id);
        post.likes.splice(index,1)
        await post.save()
        return res.json(post.likes);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    POST api/posts/comment/:post_id
//@desc     create comment
//@access   Private
router.post('/comment/:post_id',[auth,[
    check('text','Text is required').not().isEmpty(),
]],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()) {
        return res.status(400).json({msg:error.array()})
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.post_id);
        const newComment = {
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:user.id
        };
        post.comments.unshift(newComment);

        await post.save();

        res.json(post.comments);

    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    DELETE api/posts/comment/:post_id/:comment_id
//@desc     delete comment
//@access   Private
router.delete('/comment/:post_id/:comment_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        const comment = post.comments.find(comment=>comment.id.toString()===req.params.comment_id);

        if(!comment) {
            return res.status(404).json({msg:'Comment not found'});
        }
        if(comment.user.toString()!==req.user.id && req.user.id!==post.user.toString()) {
            return res.status(401).json({msg:'not authorised'});
        }

        const index = post.comments.findIndex(comment=>comment.id.toString()===req.params.comment_id);
        post.comments.splice(index,1);
        await post.save();
        res.json(post);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
})

//@route    POST api/posts/comment/:post_id/:comment_id
//@desc     update comment
//@access   Private
router.post('/comment/:post_id/:comment_id',auth,async (req,res)=>{
    try {
        const post = await Post.findById(req.params.post_id);
        const comment = post.comments.find(comment=>comment.id.toString()===req.params.comment_id);
        if(!post) {
            return res.status(404).json({msg:'Post not found'});
        }
        if(post.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'User not authorised'});
        }
        const {
            text
        } = req.body;
        if(text) {
            comment.text = text;
            post.save();
        }
        return res.json(post);
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(error.message);
        res.status(500).send('Server error');
    }
})


module.exports = router;