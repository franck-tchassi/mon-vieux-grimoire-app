const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { isEmail, isStrongPassword } = require("validator")

exports.signUp = async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 10)
        const user = new User({
            email: req.body.email,
            password: hash,
        })
        const users = await User.find()
        const emailExist = users.some((user) => user.email === req.body.email)

        if (!isEmail(req.body.email) || !isStrongPassword(req.body.password)) {
            res.status(400).json({ message: "wrong email or password format" })
        }
        if (emailExist) {
            res.status(401).json({
                message: "email already registered in database",
            })
        } else {
            await user.save()
            res.status(201).json({ message: "new user created" })
        }
    } catch (error) {
        res.status(400).json({ error })
    }
}

exports.login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({ message: "Invalid user/password" })
        }

        const valid = await bcrypt.compare(req.body.password, user.password)
        if (!valid) {
            return res.status(401).json({ message: "Invalid user/password" })
        }

        res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, process.env.JWT_BODY_TOKEN, {
                expiresIn: "24h",
            }),
        })
    } catch (error) {
        res.status(400).json({ error })
    }
}
