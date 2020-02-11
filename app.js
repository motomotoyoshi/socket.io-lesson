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
    // 接続しているソケット以外全部
    // socket.broadcast.emit('emit_from_server', 'Hello from server: ' + data);

    // 接続しているソケット全部
    io.sockets.emit('emit_from_server', '[' + socket.id + ']' + data);

  });
});