const path = require("path");
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = socketio(server);
const port = 5000;
const pubicJoinHtmlPage = path.join(__dirname, "../public");
app.use(express.static(pubicJoinHtmlPage));

server.listen(port, () => {
  console.log(`listen to the port ${port}`);
});
