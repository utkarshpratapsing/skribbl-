const express = require("express");
const app = express();
const socket = require("socket.io");
const color = require("colors");
const cors = require("cors");
const { get_Current_User, user_Disconnect, join_User, get_all_users, get_Active_User } = require("./dummyuser");

app.use(express());

const port = 8000;

app.use(cors());

var server = app.listen(
  process.env.PORT || port,
  console.log(
    `Server is running on the port no: ${(port)} `
      .green
  )
);

const io = socket(server);

//initializing the socket io connection 
io.on("connection", (socket) => {
  //for a new user joining the room
  socket.on("joinRoom_Old", ({ username, roomname}) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname, false);
    console.log(socket.id, "=id");
    socket.join(p_user.room);
    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });

    socket.emit("updateusers");
  });

  socket.on("joinRoom_New", ({ username, roomname}) => {
    //* create user
    const p_user = join_User(socket.id, username, roomname, true);
    console.log(socket.id, "=id");
    socket.join(p_user.room);
    //display a welcome message to the user who have joined a room
    socket.emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `Welcome ${p_user.username}`,
    });

    //displays a joined room message to all other room users except that particular user
    socket.broadcast.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: `${p_user.username} has joined the chat`,
    });

    socket.emit("updateusers");
  });

  //user sending message
  socket.on("chat", (text) => {
    //gets the room user and the message sent
    const p_user = get_Current_User(socket.id);
    io.to(p_user.room).emit("message", {
      userId: p_user.id,
      username: p_user.username,
      text: text,
    });
  });

  //when the user exits the room
  socket.on("disconnect", () => {
    //the user is deleted from array of users and a left room message displayed
    const p_user = user_Disconnect(socket.id);
    io.emit("updateusers");
    if (p_user) {
      io.to(p_user.room).emit("message", {
        userId: p_user.id,
        username: p_user.username,
        text: `${p_user.username} has left the room`,
      });
    }
  });

  socket.on("updateusers", () => {
    const p_user_arr = get_all_users();
    io.emit("userList",{users: p_user_arr});
  });

  socket.on("get_current_drawer", (roomname) => {
    const p_user = get_Active_User(roomname);
    console.log("---------Get_Current_Drawer is working-----------------------",roomname)
    console.log("---------------------Found user:",p_user)
    socket.emit("received_active_user", {
      current_user: p_user,
    });
  });

  socket.on("get_current_user", () => {
    const p_user = get_Current_User(socket.id);
    socket.emit("received_current_user", {
      current_user: p_user,
    });
  });

  socket.on("draw", (draw_data) => {
    const p_user = get_Current_User(socket.id);
    io.to(p_user.room).emit("do_drawing", {
      draw_data: draw_data,
    });
  });

});

const path = require('path');
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'chatfrontend/build')));
// Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'chatfrontend/build', 'index.html'));
  });
}
const whitelist = ['http://localhost:3000', 'http://localhost:8000','https://fourskribblrs.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable")
      callback(null, true)
    } else {
      console.log("Origin rejected")
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

