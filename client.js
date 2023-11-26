const WebSocket = require('ws');

const host = 'ws://localhost';
const port = '8081';

const socket = new WebSocket(host + ':' + port);

socket.addEventListener('open', () => {
    console.log('Connected to server');
});

socket.addEventListener('message', (event) => {
    var reponse = JSON.parse(event.data);
    console.log(`Message from ${reponse.sender}: ${reponse.msg}`);
});

socket.addEventListener('close', () => {
    console.log('Disconnected from server');
});

function sendMsgToServer(msg) {
    try {
        socket.send(msg);
    } catch (error) {
        console.error(error);
    }
}