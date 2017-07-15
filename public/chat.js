//Make Connection

//Frontend socket not backend socket
//IO is a library on the frontend
var socket = io.connect('http://localhost:4000');


// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
	  feedback = document.getElementById('feedback'),
      output = document.getElementById('output');

// Emit events
btn.addEventListener('click', function(){
	console.log("hi")
	//object sent to server, name of message, actual data
  socket.emit('chat', {
      message: message.value,
      handle: handle.value
  });
  message.value = "";
});

message.addEventListener('keypress', function() {
	socket.emit('typing', handle.value)
})
// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

//Listen for typing message
socket.on('typing', function(data){
	console.log("im listningfasdf")
	feedback.innerHTML = '<p><em>' + data + 'is typing a message </p>'
});