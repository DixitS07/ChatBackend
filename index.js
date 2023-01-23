const cors = require('cors')
const express = require('express')
const users = {};

const app = express();
// app.use(cors());
const server = require('http').createServer(app);
const io = require('socket.io')(server);
io.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}))
let port = 8000
app.listen(port, function () {
    console.log('Server running on localhost:' + port + '...')
})



io.on('connection',socket =>{
    console.log('connection established')
    socket.on('new-user-joined',name=>{
        console.log('new user joined',name)
        users[socket.id] = name;
        socket.broadcast.emit('user-Joined',name)
    });

    socket.on('send',message=>{
        console.log(message)
    socket.broadcast.emit('receive',{message:message,name:users[socket.id]})
    });
 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',users[socket.id])
        delete users[socket.id];
        });
})

