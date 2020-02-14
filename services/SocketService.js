import openSocket from 'socket.io-client';

let socket;

let userList = [];

function getSocket(){
	return socket;
}
function openServiceSocket() {
	socket = openSocket('http://localhost:3000');
	socket.on('connect', () => {
	  console.log('Connected!');
	});
	socket.on('user joined', (data) => {
	    console.log(data.username + ' joined');
	    console.log(data);
	    userList.push(data.username);
   });
}

function getUserList(){
	return userList;
}
function addUserName(username){
	socket.emit('add user', username);
}

export default {
  getSocket,
  openServiceSocket,
  addUserName,
  getUserList
};