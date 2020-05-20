const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");
const Users = require("./users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use("/", (req, res) => res.send("Hello Server"));

io.on("connection", (socket) => {
  socket.on("register", (data) => {
    console.log("register:", data);
    let user = { id: socket.id, ...data };
    Users.addUser(user);

    socket.join('universe');
    socket.join(user.id);

    let users = Users.getUsers();
    socket.broadcast.to('universe').emit("users", users);
    socket.emit("users", users);
  });

  socket.on("disconnect", (args) => {
    console.log("disconnect:", args);
    Users.removeUser(socket.id);

    let users = Users.getUsers();
    socket.broadcast.to('universe').emit("users", users);
  });

  socket.on("message", (data) => {
    console.log("message:", data);
    socket.broadcast.to(data.chat).emit("message", data);
  });

});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server is running on ${PORT}`));
