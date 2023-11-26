import WebSocket from 'ws';

const host = 'ws://localhost';
const port = '8081';

const socket = new WebSocket(host + ':' + port);



socket.addEventListener('open', () => {
    console.log('Connected to server');
});

socket.addEventListener('message', (event) => {
    var reponse = JSON.parse(event.data);
    console.log(`Message from ${reponse.sender}: ${reponse.msg}`);

    // correct this. This was just for test purposes
    var sender = 2
    if (reponse.sender == 'server') {
        sender = 1
    } else if (reponse.sender == 'me') {
        sender = 0;
    }

    showMessage(reponse.msg, sender);
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

function showMessage(msg, sender) {
    if (msg === null || msg === undefined || msg === '') {
        return;
    }

    const newMsg = document.createElement('div');
    newMsg.classList.add('msg');
    if (sender==0) {
        newMsg.classList.add('msg-server');
    } else if (sender==1) {
        newMsg.classList.add('msg-my');
    } else {
        newMsg.classList.add('msg-others');
    }

    const textNode = document.createTextNode(msg);
    newMsg.appendChild(textNode);

    outputDiv.appendChild(newMsg);
    outputDiv.scrollTop = outputDiv.scrollHeight;
}

function sendMessage() {
    const outputDiv = document.getElementById('output');
    const textArea = document.getElementById('input-text');
    const textInput = textArea.value;

    textArea.value = '';

    if (textInput === null || textInput === undefined) {
        return;
    }

    const trimmedInput = textInput.trim();

    if (trimmedInput === '') {
        return;
    }

    sendMsgToServer(trimmedInput);
}