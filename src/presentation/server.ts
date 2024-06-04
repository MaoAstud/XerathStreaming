import express, { Router } from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';

export class Server {
    private app = express();
    private routes: Router;
    private server: http.Server;
    private wss: WebSocket.Server;

    port = 9780;

    constructor(routes: Router) {
        this.routes = routes;
        this.server = http.createServer(this.app);
        this.wss = new WebSocket.Server({ server: this.server });
        this.setupWebSocket();
    }

    private setupWebSocket() {
        let clients: WebSocket[] = [];

        this.wss.on('connection', (ws: WebSocket) => {
            console.log('Client connected');
            clients.push(ws);

            ws.on('message', (message: WebSocket.Data) => {
                console.log(`Received message of type ${typeof message}`);
                if (message instanceof Buffer) {
                    clients.forEach(client => {
                        if (client !== ws && client.readyState === WebSocket.OPEN) {
                            client.send(message);
                        }
                    });
                }
            });

            ws.on('close', () => {
                console.log('Client disconnected');
                clients = clients.filter(client => client !== ws);
            });
        });
    }

    async start() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static(path.join(__dirname, '../../public')));
        this.app.use(this.routes);

        this.server.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
