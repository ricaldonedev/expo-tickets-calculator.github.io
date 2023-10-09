const WebSocket = require('ws');
const url = require('url');

const wss = new WebSocket.Server({ port: 8080 });

// Declare the sessions object
let sessions = {};

wss.on('connection', (ws, req) => {
    const { query: { sessionId } } = url.parse(req.url, true);
    sessions[sessionId] = ws;

    setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
            ws.ping();
        }
    }, 30000);

    ws.on('pong', () => {
        console.log('Received pong from client');
    });


    ws.on('message', (message) => {
        // Broadcast the message to all connected clients
        for (let id in sessions) {
            if (sessions[id].readyState === WebSocket.OPEN) {
                sessions[id].send(message);
            }
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
    });

    ws.on('close', (code, reason) => {
        console.log(`WebSocket connection closed by the client. Code: ${code}, Reason: ${reason}`);
    });

    ws.on('close', () => {
        delete sessions[sessionId];
    });
});
