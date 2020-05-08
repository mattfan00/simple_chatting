const socket = io()

const chatForm = document.getElementById('chat-form')
const messages = document.getElementById('messages')

const chatId = window.location.pathname.split('/')[2]

socket.emit('joinChat', chatId)

socket.on('message', (msg) => {
  outputMessage(msg)
})


chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  msg = e.target.elements.msg
  socket.emit('chat message', {chatId, value: msg.value})
  msg.value = ''
})

function outputMessage(msg) {
  var div = document.createElement('div')
  div.innerHTML = `
    <div class='message'>
      ${msg}
    </div>`
  messages.appendChild(div)
}