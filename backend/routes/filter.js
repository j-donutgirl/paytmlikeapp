const express = require('express');
const {User}  = require('../db');

const router = express.Router();

router.get('/', async (req, res)=>{
    const filter = req.query.filter||"";
    const users = await User.find({
        $or:[
            {
                firstName:{
                    $regex: filter,
                    $options: 'i' //"$options": "i" makes the regular expression case-insensitive.
                }
            },
            
        ]
    })
    res.status(200).json({
        users: users.map(user=>({
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            _id: user._id
        }))
    })
})

module.exports = router;