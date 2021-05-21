const app = require("express")();
const httpServer = require("http").Server(app);
const io = require("socket.io")(httpServer, {
    cors: {
        origin: '*',
    }
});
const cors = require('cors');
var corsOptions = {
    origin: '*',
    credentials: true
};
app.use(cors(corsOptions));

app.get('/chat', (req, res) => {
    res.sendFile(__dirname + "/src/views/chat.html");
})


var usernames = {};
var roomOnline = ['global'];
var userOnline = { 'global': 0 };

io.on("connection", (socket) => {
    socket.on('created User', (user) => {
        usernames[user] = user;
        socket.username = user;
        socket.join('global')
        userOnline['global'] += 1;
        socket.currentRoom = 'global';
        console.log('new user to server');
        socket.emit('updateRoom', roomOnline);
        io.sockets.emit('updateUserOnline', usernames)
        io.emit('updateNumberOfUsers',userOnline);

        // console.log(io.sockets.adapter.rooms);
    })

    socket.on('sendMsg', (msg) => {
        // console.log(socket);
        io.sockets.to(socket.currentRoom).emit("received-Msg", socket.username, msg);
    })

    socket.on('create-room', (roomName) => {
        roomOnline.push(roomName);
        userOnline[roomName] = 0;
        console.log(userOnline);
        // let userOnline = [];
        // for(let i =0;i<roomOnline.length;i++){
        //     console.log(io.sockets.adapter.rooms.get(roomOnline[i]));
        // }
        io.emit('updateRoom', roomOnline)
    })

    socket.on('joinRoom', (roomName) => {
        socket.leave(socket.currentRoom);
        socket.join(roomName);
        userOnline[socket.currentRoom] -= 1;
        userOnline[roomName] += 1;
        socket.currentRoom = roomName;
        io.emit('updateNumberOfUsers',userOnline);
        console.log(userOnline);
        console.log(usernames);
    })

    socket.on('disconnect', () => {
        if (io.sockets.adapter.rooms.get(socket.currentRoom) == undefined && socket.currentRoom != roomOnline[0]) {
            roomOnline.splice(roomOnline.indexOf(socket.currentRoom), 1);
            delete userOnline[socket.currentRoom]
            io.emit('updateRoom', roomOnline)
        } else {
            userOnline[socket.currentRoom] -= 1;
        }
        delete usernames[socket.username];
        io.sockets.emit('updateUserOnline', usernames)
    })
});




httpServer.listen(3000, () => {
    console.log('Server running port : 3000');
});