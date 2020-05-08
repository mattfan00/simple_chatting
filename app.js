const express = require('express'),
      http = require('http'),
      socketio = require('socket.io'),
      bodyParser = require('body-parser')

const app = express(),
      server = http.createServer(app),
      io = socketio(server)


app.use(express.static(__dirname + "/public"))

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))

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

app.get('/login', (req, res) => {
  res.render('login')
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.redirect('/chat')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register', (req, res) => {
  console.log(req.body)
  res.redirect('/chat')
})

app.post('/login', (req, res) => {
  console.log(req.body)
  res.redirect('/chat')
})

app.get('/chat', (req, res) => {
  res.redirect('/chat/' + chats[0].id)
})

app.get('/chat/:id', (req, res) => {
  res.render('index', {chats})
})


io.on('connection', (socket) => {
  socket.on('joinChat', (chatId) => {
    socket.join(chatId)
    // Send message to the user that just joined the chat 
    socket.emit('message', 'Welcome to chat room ' + chatId)

    // Send message to the whole lobby except the user that joined
    socket.to(chatId).broadcast.emit('message', 'A new user has joined the chat')
  })

  // Send message to everyone that a user has left the chat 
  // socket.on('disconnect', () => {
  //   io.emit('message', 'A user has left the chat')
  // })

  socket.on('chat message', (msg) => {
    io.to(msg.chatId).emit('message', msg.value)
  });
});

server.listen(5000, () => console.log('started socket_chat server'))