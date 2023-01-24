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
        // console.log('new user joined',name)
        users[socket.id] = name;
        socket.emit('user-Joined',{message:'new user joined',name:users[socket.id]})
    });

    socket.on('send',message=>{
    // console.log(message,'received from anglar')
    socket.emit('receive', {message:message,name:users[socket.id]})
    });
 
    socket.on('user-left',message=>{
        socket.emit('left',{message:'user has left',name:users[socket.id]})
        delete users[socket.id];
        });
})

