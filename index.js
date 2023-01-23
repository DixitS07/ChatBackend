const cors = require('cors')
const users = {};

const io = require('socket.io')(8000, {
    cors: {
      origin: 'http://localhost:4200',
      methods: ["GET", "POST"]
    }
  });

io.on('connection',socket =>{
    console.log('connection established')
    socket.on('new-user-joined',name=>{
        console.log('new user joined',name)
        users[socket.id] = name;
        socket.broadcast.emit('user-Joined',name)
    });

    socket.on('send',message=>{
    console.log(message,'received from anglar')
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
        });
})

