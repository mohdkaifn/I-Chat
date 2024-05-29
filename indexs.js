// Node server which will be handle socket io connections...
//similer process step by step to connect... first open terminal then type cd .\nodeServer\
// then enter type npm init then enter overall process...again 
// here we can dowloaded socket io..the process of dowload npm i socket.io
// similerly dowload nodemon....same process npm i nodemon...
const io = require('socket.io')(5000)

const users = {};

//socket instance
io.on('connection', socket =>{
    // If any new user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{ 
        //if the person join into chat can notify already have person
        console.log("New user ",name);
        users[socket.id] = name;
        //new used joined
        socket.broadcast.emit('user-joined', name);
    });

    // If someone sends a message, broadcast it to other people
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    // If someone leaves the chat, let others know 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });

})