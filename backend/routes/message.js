const express = require('express')
const protect = require('../middleware/authMiddleware')
const Message = require('../models/message')
const User = require('../models/user')
const router = express.Router()

// send msg
router.post('/', protect, async (req, res) => {

    const { content, chatId } = req.body;

    var newMessage = {
        sender: req.user,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic")
        message = await message.populate("chat")
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        res.status(200).json(message);
    } catch (error) {
        res.status(500).json(message);
    }


})


// fetch msg
router.get('/:chatId', protect, async (req, res) => {

    try {
        const message = await Message.find({
            chat: req.params.chatId
        })
            .populate("sender", "name pic email")
            .populate("chat");

        res.status(200).json(message)
    } catch (error) {
        res.status(500).json(error)
    }

})

module.exports = router