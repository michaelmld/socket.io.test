//we 2 required functions
var express = require('express');
var socket = require('socket.io');

//App setup

var app = express()
var server = app.listen(4000, function(){
	console.log("listen to requests on port 4000");
});

//Static fileSize
app.use(express.static('public'));

//Socket setup

var io = socket(server);

//listen to connection message

//this function is called when a connection is made
//socket is the client socket that sent us some message
io.on('connection', function(socket){
	console.log("made socket connection", socket.id)
	
	//listen to the message coming from client
	socket.on('chat', function(data){
		//all sockets connected to server
		io.sockets.emit('chat', data)
	});
	
	socket.on('typing', function(data) {
		//broadcast every socket/client, but not original socket
		socket.broadcast.emit('typing', data)
	})
	
})