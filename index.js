var express = require("express");
var app = express();
var http = require("http").Server(app);
var io = require("socket.io")(http);

app.use(express.static("public")); // вказівка каталогу для статичних ресурсів, у якому буде розташовано файл css, що підключається

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

io.on("connection", function (socket) {
  console.log("a user connected");

  socket.on("send message", function (msg) {
    io.emit("receive message", msg); // надсилає повідомлення всім підключеним клієнтам
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
