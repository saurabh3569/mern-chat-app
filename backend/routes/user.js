const express = require('express')
const User = require('../models/user')
const router = express.Router()
const bcrypt = require('bcryptjs')
const generateToken = require('../config/generateToken')
const protect = require('../middleware/authMiddleware')
const jwt = require('jsonwebtoken')


// search user
router.get('/', protect, async (req, res) => {
    const keyword = req.query.search
        ? {
            $or: [
                { name: { $regex: req.query.search, $options: "i" } },
                { email: { $regex: req.query.search, $options: "i" } },
            ],
        }
        : {};
 
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).json(users);
});


// create user
router.post('/register', async (req, res) => {

    try {
        const { name, email, password, pic } = req.body

        if (!name || !email || !password) {
            return res.status(400).json('Pls Fill all the field')
        }

        const userExist = await User.findOne({ email })

        if (userExist) {
            return res.status(400).json('User alreasy exist')
        }

        const salt = await bcrypt.genSalt(10)
        const hpass = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, email, password: hpass, pic
        })

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json(error)
    }
})


// login user
router.post('/login', async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) return res.status(400).json('Pls Fill All The Field')

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(404).json('User not exist')
        }

        const passMatch = await bcrypt.compare(password, user.password)

        if (!passMatch) {
            return res.status(403).json('Wrong Credentails')
        }

        let token = await generateToken(user._id)

        res.cookie("jwtToken", token, {
            expires: new Date(Date.now() + 25892000000),
            httpOnly: true
        })

        res.status(200).json({
            _id: user._id,
            name: user.name,
            pic: user.pic,
            email: user.email,
            token: token
        })
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router