const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const socketio = require('socket.io')
const io = socketio(server)
const users = {}
app.use('/',express.static(path.join(__dirname,'public')))

io.on('connection',(socket) =>{
    console.log(`Someone got connected with socket id - ${socket.id}`)
    socket.on('send-msg',(data) =>{
        io.emit('received-msg',{
            msg:data.msg,
            username: users[socket.id]
        })
    });
    socket.on('login', (data) =>{
        users[socket.id] = data.username;

    })
})





const port = process.env.port ||   3000;
server.listen(port,()=>{
    console.log(`server started at port ${port}`)
})