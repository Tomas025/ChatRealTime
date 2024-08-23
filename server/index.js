const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: 'http://localhost:3000'}})

const PORT = 3001

io.on('connection', socket => {
  console.log('Usuário conectado!', socket.id);

  socket.on('disconnect', reason => {
    console.log('Usuário desconectado!', socket.id)
  })

  socket.on('set_username', user => {
    socket.data.username = user.username
    socket.data.color = user.color
  })

  socket.on('message', text => {
    io.emit('receive_message', {
      text,
      authorId: socket.id,
      author: socket.data.username,
      color: socket.data.color
    })
  })
})

server.listen(PORT, () => console.log('Server running...'))