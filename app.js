const app = require('http').createServer(handler),
      io = require('socket.io').listen(app),
      fs = require('fs');

app.listen(1337);

function handler(req, res) {
  fs.readFile(__dirname + '/index.html', (err, data) => {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}

io.sockets.on('connection', socket => {
  socket.on('emit_from_client', data => {
    socket.join(data.room);
    socket.emit('emit_from_server', 'you are in ' + data.room);
    socket.broadcast.to(data.room).emit('emit_from_server', data.msg);
  });
});