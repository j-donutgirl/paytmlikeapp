const express = require('express');
const jwt = require('jsonwebtoken');
const { User, Account } = require('../db');
const updateRouter = require('./update');
const filterRouter = require('./filter');
const { signupSchema, signinSchema } = require('../types');
const JWT_SECRET = require('../config');

const router = express.Router();

router.use('/', updateRouter);
router.use('/bulk', filterRouter);

router.post('/signup', async (req, res)=>{
    const body = req.body;
    const {success} = signupSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await User.findOne({
        username: body.username
    })
    if(user){
        return res.status(411).json({
            message: "Email already taken"
        })
    }
    const dbUser = await User.create(body);

    await Account.create({
        userId: dbUser._id,
        balance: 1 + Math.random()*10000
    })

    const token = jwt.sign({
        userId: dbUser._id
    }, JWT_SECRET);

    return res.status(200).json({
        message:"User created successfully",
        token: token
    })
})

router.post('/signin', async (req, res)=>{
    const body = req.body;
    const {success} = signinSchema.safeParse(body);
    if(!success){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const {username, password} = body;
    const user = await User.findOne({
        username: username,
        password: password
    })
    
    
    if(!user){
        return res.status(411).json({
            message: "Error while logging in ! User doesn't exist"
        })
    }

    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    return res.status(200).json({
        token: token
    })
})

module.exports = router;