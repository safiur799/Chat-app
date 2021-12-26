const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
require("dotenv").config();
const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = Process.env.PORT || 5000;
const pubicJoinHtmlPage = path.join(__dirname, "./");
app.use(express.static(pubicJoinHtmlPage));
const user = {};
io.on("connection", (socket) => {
  socket.emit("messege", "welcome!");
  socket.on("new-user", (Username) => {
    user[socket.id] = Username;
    console.log(Username);
    socket.broadcast.emit("join", Username);
  });
  socket.on("send", (userMessege) => {
    socket.broadcast.emit("recieve", {
      messege: userMessege,
      name: user[socket.id],
    });
  });
});

server.listen(port, () => {
  console.log(`listen to the port ${port}`);
});
