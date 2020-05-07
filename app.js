const express = require('express'),
      http = require('http'),
      socketio = require('socket.io')

const app = express(),
      server = http.createServer(app),
      io = socketio(server)


app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
  res.render('index.html')
})

io.on('connection', (socket) => {
  // Send message to the user that just joined the chat 
  socket.emit('message', 'Welcome to my chat application')

  // Send message to the whole lobby except the user that joined
  socket.broadcast.emit('chat message', 'A new user has joined the chat')

  // Send message to everyone that a user has left the chat 
  socket.on('disconnect', () => {
    io.emit('chat message', 'A user has left the chat')
  })

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg)
  });
});

server.listen(5000, () => console.log('started socket_chat server'))