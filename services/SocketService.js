import openSocket from 'socket.io-client';

let socket;

let userList = [];

let messageList = [{username : 'user', message:'test'}];

function getSocket(){
	return socket;
}
function openServiceSocket() {
	socket = openSocket('http://localhost:3000');
	socket.on('connect', () => {
	  console.log('Connected!');
	});
}

function addChatMessage(data){
	messageList.push(data);
}

function sendMessage(username, message){
	var data = {username: username, message: message};
	socket.emit('new message', message);
	addChatMessage(data);
}

function getUserList(){
	return userList;
}

function getMessageList(){
	console.log(messageList)
	return messageList;
}
function addUserName(username){
	socket.emit('add user', username);
	userList.push({username : username, avatarurl: 'https://via.placeholder.com/150'});
}

export default {
  getSocket,
  openServiceSocket,
  addUserName,
  getUserList,
  getMessageList,
  sendMessage,
  addChatMessage
};