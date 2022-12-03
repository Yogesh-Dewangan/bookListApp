const express = require('express');
const User = require('../model/User');
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: "Success",
            users: users
        })
    } catch(e) {
        res.status(500).json({
            status: "Failed to get users",
            message: e.message
        })
    }

})

module.exports = router;