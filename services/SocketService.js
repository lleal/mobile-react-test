import openSocket from 'socket.io-client';

let socket;

function openServiceSocket() {
	socket = openSocket('http://localhost:3000');
	socket.on('connect', () => {
	  console.log('Connected!');
	});
}

function addUserName(username){
	socket.emit('add user', username);
}

export default {
  socket,
  openServiceSocket,
  addUserName,
};