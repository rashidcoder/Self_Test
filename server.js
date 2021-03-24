const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const cors = require("cors"); 

const port = process.env.PORT || 80;
app.use(cors({ origin: true }));
app.use(express.static(__dirname + "/public"));

io.on("connection", socket => {
  console.log(`connect ${socket.id}`);

  socket.on('userCoordinates', (coords) => {
    console.log(coords);
    socket.broadcast.emit('newUserCoordinates', coords);
  });
  
  socket.on("disconnect", (reason) => {
    console.log(`disconnect ${socket.id} due to ${reason}`);
  });
});

server.listen(port, () => console.log(`server listening at http://localhost:${port}`));