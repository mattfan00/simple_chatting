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
  console.log(currentUser)
  const message = {
    user: currentUser,
    chatId,
    value: msg.value
  }
  socket.emit('chat message', message)
  msg.value = ''
})

function outputMessage(msg) {
  var div = document.createElement('div')
  console.log(msg)
  div.innerHTML = `
    <div class='message'>
      <div class='message-info'>
        <h4>${msg.user}</h4>
        <div>${msg.time}</div>
      </div>
      <div class='message-body'>
        ${msg.value}
      </div>
    </div>`
  messages.appendChild(div)
}