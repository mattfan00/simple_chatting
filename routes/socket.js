const moment = require('moment')

module.exports = (io) => {
  io.on('connection', (socket) => {
    socket.on('joinChat', (chatId) => {
      socket.join(chatId)
      // // Send message to the user that just joined the chat 
      // socket.emit('message', formatMessage('Bot', 'Welcome to chat room ' + chatId))

      // // Send message to the whole lobby except the user that joined
      // socket.to(chatId).broadcast.emit('message', formatMessage('Bot', 'A new user has joined the chat'))
    })

    // Send message to everyone that a user has left the chat 
    // socket.on('disconnect', () => {
    //   io.emit('message', 'A user has left the chat')
    // })

    socket.on('chat message', (msg) => {
      io.to(msg.chatId).emit('message', formatMessage(msg.user, msg.value))
    })
  })
}


function formatMessage(username, value) {
  return {
    user: username,
    value, 
    time: moment().format('h:mm a')
  }
}