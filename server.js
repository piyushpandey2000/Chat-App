const WebSocket = require('ws');

const PORT = '8081';

const webSocketServer = new WebSocket.Server({ port: PORT });

let clients = new Map();

webSocketServer.on('connection', (ws, req) => {
    const clientIp = "ip";

    console.log(`Client connected: ${clientIp}`);
    clients.set(clientIp, ws);
    clients.forEach((ip, ws) => {
        ws.send(JSON.stringify({
            'msg': `${clientIp} connected!`,
            'sender': 'server'
        }));
    });

    ws.on('message', (message) => {
        console.log(`Received: ${message}`);
        var response = {
            'msg': message,
            'sender': clientIp
        };

        clients.forEach((ip, ws) => {
            ws.send(JSON.stringify(response));
        });
    });
    
    ws.on('close', () => {
        console.log(`Client disconnected: ${clientIp}`);
        clients.delete(clientIp);

        clients.forEach((ip, ws) => {
            ws.send(JSON.stringify({
                'msg': `${clientIp} disconnected!`,
                'sender': 'server'
            }));
        });
    });
});