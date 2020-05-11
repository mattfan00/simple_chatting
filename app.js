const express = require('express'),
      http = require('http'),
      socketio = require('socket.io'),
      bodyParser = require('body-parser'),
      config = require('config'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      LocalStrategy = require('passport-local'),
      User = require('./models/user')


const app = express(),
      server = http.createServer(app),
      io = socketio(server)

const userRoutes = require('./routes/user'),
      chatRoutes = require('./routes/chat'),
      ioRoutes = require('./routes/socket')(io)

const db = config.get('mongoURI')
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})

app.use(express.static(__dirname + "/public"))

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(require("express-session")({
  secret: "this is my secret",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// PASS IN THE CURRENT USER TO EVERY ROUTE
app.use(function(req, res, next) {
  res.locals.currentUser = req.user
  next()
})

app.use(userRoutes)
app.use(chatRoutes)
ioRoutes

// io.on('connection', (socket) => {
//   socket.on('joinChat', (chatId) => {
//     socket.join(chatId)
//     // Send message to the user that just joined the chat 
//     socket.emit('message', 'Welcome to chat room ' + chatId)

//     // Send message to the whole lobby except the user that joined
//     socket.to(chatId).broadcast.emit('message', 'A new user has joined the chat')
//   })

//   // Send message to everyone that a user has left the chat 
//   // socket.on('disconnect', () => {
//   //   io.emit('message', 'A user has left the chat')
//   // })

//   socket.on('chat message', (msg) => {
//     io.to(msg.chatId).emit('message', msg.value)
//   });
// });

server.listen(5000, () => console.log('started socket_chat server'))