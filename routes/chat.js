const express = require('express'),
      router = express.Router(),
      auth = require('../middleware/auth')


const chats = [
  {
    id: 1,
    name: 'Pig'
  },
  {
    id: 2,
    name: 'Dog'
  }
]

router.get('/chat', auth.isLoggedIn, (req, res) => {
  res.redirect('/chat/' + chats[0].id)
})

router.get('/chat/:id', auth.isLoggedIn, (req, res) => {
  res.render('index', {chats, chatId: req.params.id})
})


module.exports = router