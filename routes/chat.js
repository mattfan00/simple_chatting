const express = require('express'),
      router = express.Router(),
      auth = require('../middleware/auth'),
      Chat = require('../models/chat')


router.get('/', (req, res) => {
  res.redirect('/chat')
})

router.get('/chat', auth.isLoggedIn, async (req, res) => {
  let chats = await Chat.find({})
  res.redirect('/chat/' + chats[0]._id)
})

router.get('/chat/new', auth.isLoggedIn, (req, res) => {
  res.render('newChat')
})

router.get('/chat/:id', auth.isLoggedIn, async (req, res) => {
  let chats = await Chat.find({})
  res.render('index', {chats, chatId: req.params.id})
})


router.post('/chat', auth.isLoggedIn, async (req, res) => {
  try {
    const { name } = req.body
    let newChat = await Chat.create({name})
    if (!newChat) throw Error('Error creating chat room')

    res.redirect('/chat')
  } catch(err) {
    console.log(err)
  }
})


module.exports = router