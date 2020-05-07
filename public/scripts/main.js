const socket = io()

const chatForm = document.getElementById('chat-form')
const messages = document.getElementById('messages')

socket.on('message', (msg) => {
  console.log(msg)
})

socket.on('chat message', (msg) => {
  var div = document.createElement('div')
  div.innerHTML = `
    <div class='message'>
      ${msg}
    </div>`
  messages.appendChild(div)
})

chatForm.addEventListener('submit', (e) => {
  e.preventDefault()

  msg = e.target.elements.msg
  socket.emit('chat message', msg.value)
  msg.value = ''
})
