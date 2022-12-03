const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../model/User')
const secret = process.env.SECRET;
let SESSIONID;
const router = express.Router();

router.use(express.json());

router.post('/',
    body('userName').isEmail(),
    body('password').isLength({ min: 6, max: 16 }),
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: "Failed in validationResult",
                    errors: errors.array()
                })
            }

            const { userName, password } = req.body;

            const user = await User.findOne({ userName: userName });

            if (!user) {
                return res.status(400).json({
                    message: 'User does not Exists'
                })
            }

            bcrypt.compare(password, user.password, function (err, result) {
                if (err) {
                    return res.status(400).json({
                        status: "Error occured during pasword comparision",
                        errors: err.message
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        data: user._id
                    }, secret, { expiresIn: 60 * 60 });
                    SESSIONID = token;
                    res.status(202).json({
                        status: "Success",
                        message: "User signed In successfully",
                        token
                    })
                } else {
                    res.status(400).json({
                        status: "Failed",
                        message: "Invalid Credential"
                    })
                }
            })
        } catch (e) {
            return res.status(500).json({
                status: "Error catched",
                errors: e.message
            })
        }

    })

module.exports = router;