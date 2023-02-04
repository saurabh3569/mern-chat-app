const express = require('express')
const router = express.Router()

const protect = require('../middleware/authMiddleware')
const Chat = require('../models/chat')

// access chat
router.post('/', protect, async (req, res) => {
    try {
        const { userId } = req.body

        var isChat = await Chat.find({
            isGroupChat: false,
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } }
            ]
        }).populate("users", "-password")

        // if chat have between two user then we not create if not have then we will create new chat
        if (isChat.length > 0) {
            return res.status(201).json(isChat[0])
        } else {
            var chatData = await Chat.create({
                chatname: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            })
        }

        res.status(201).json(chatData)
    } catch (error) {
        res.status(500).json(error)
    }
})


// fetch chat
router.get('/', protect, async (req, res) => {

    try {
        const results = await Chat.find({
            users: {
                $elemMatch: { $eq: req.user._id }
            }
        })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")
            .sort({ updatedAt: -1 })

        res.status(200).send(results);
    } catch (error) {
        res.status(500).send(error);
    }

})


// rename group 
router.put('/rename', async (req, res) => {

    try {
        const { chatId, chatname } = req.body

        const updatedChat = await Chat.findByIdAndUpdate(
            chatId,
            { chatname: chatname },
            { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!updatedChat) {
            res.status(404).json("Chat Not Found");
        } else {
            res.status(200).json(updatedChat);
        }
    } catch (error) {
        res.status(500).json(error);
    }

})


// groupchat create
router.post('/group', protect, async (req, res) => {

    try {
        const { chatname } = req.body

        var users = JSON.parse(req.body.users);

        users.push(req.user)


        const groupchat = await Chat.create({
            chatname: chatname,
            groupAdmin: req.user,
            isGroupChat: true,
            users: users
        })

        const fullGroupChat = await Chat.findOne({ _id: groupchat._id })
            .populate("users", "-password")
            .populate("groupAdmin", "-password")

        res.status(201).json(fullGroupChat)
    } catch (error) {
        res.status(500).json(error)
    }

})


// add member in groupchat
router.put('/groupadd', async (req, res) => {

    try {
        const { chatId, userId } = req.body

        const added = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { users: userId } }, { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) return res.status(404).json('chat not found')
        else res.status(201).json(added)
    } catch (error) {
        res.status(500).json(error)
    }
})


// remove member in groupchat
router.put('/groupremove', async (req, res) => {

    try {
        const { chatId, userId } = req.body

        const added = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { users: userId } }, { new: true }
        )
            .populate("users", "-password")
            .populate("groupAdmin", "-password");

        if (!added) return res.status(404).json('chat not found')
        else res.status(201).json(added)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router