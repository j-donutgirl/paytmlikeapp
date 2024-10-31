const express = require('express');
const authmiddleware  = require('../middlewares/authmiddleware');
const { updateSchema } = require('../types');
const {User}  = require('../db');

const router = express.Router();

router.put('/', authmiddleware, async (req,res)=>{
    const {success} = updateSchema.safeParse(req.body);
    if(!success){
        return res.status(411).json({
            message: "Error while updating information, Incorrect inputs"
        })
    }
    await User.updateOne(req.body, {
        id: req.userId
    });
    return res.status(200).json({
        message: "Information updated successfully"
    })
})

module.exports = router;