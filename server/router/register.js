const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const User = require('../model/User')
const router = express.Router();

router.use(express.json());

router.post('/',
    body('userName').isEmail(),
    body('password').isLength({ min: 6, max: 16 }),
    body('cpassword').isLength({ min: 6, max: 16 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: "Failed in validationResult",
                    errors: errors.array()
                })
            }

            const { userName, password, cpassword } = req.body;

            let user = await User.findOne({ userName: userName });

            if (user) {
                return res.status(400).json({
                    message: 'User Already Exists'
                })
            }

            if (password !== cpassword) {
                return res.status(400).json({
                    message: 'Password does not match'
                })
            }

            bcrypt.hash(password, 10, async function (err, hash) {
                if (err) {
                    return res.status(500).json({
                        error: err.message
                    })
                }
                if (hash) {
                    // user = await User.create({
                    //     userName,
                    //     password: hash
                    // })
                    console.log(req.body);

                    return res.status(201).json({
                        status: "Success",
                        message: "User registered successfully"
                    })
                }
            })
        } catch (e) {
            return res.status(500).json({
                status: "Error catched",
                message: e.message
            })
        }
    })

module.exports = router;