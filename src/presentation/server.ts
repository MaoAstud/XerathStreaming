import express, { Router, Request } from 'express';
import cors from 'cors';
import http from 'http';
import WebSocket from 'ws';
import path from 'path';

export class Server {
  private app = express();
  private routes: Router;
  private server: http.Server;
  private wss: WebSocket.Server;
  private channels: Map<string, { transmitter: WebSocket | null, receivers: WebSocket[] }> = new Map();

  port = 9780;

  constructor(routes: Router) {
    this.routes = routes;
    this.server = http.createServer(this.app);
    this.wss = new WebSocket.Server({ server: this.server });
    this.setupWebSocket();
  }

  private setupWebSocket() {
    this.wss.on('connection', (ws: WebSocket, req: Request) => {
      const url = new URL(req.url || '', `http://${req.headers.host}`);
      const channelId = url.searchParams.get('channelId');
      const type = url.searchParams.get('type'); // "transmitter" or "receiver"

      if (!channelId || !type) {
        ws.close();
        return;
      }

      console.log(`Client connected to channel ${channelId} as ${type}`);

      if (!this.channels.has(channelId)) {
        this.channels.set(channelId, { transmitter: null, receivers: [] });
      }

      const channel = this.channels.get(channelId);

      if (type === 'transmitter') {
        channel!.transmitter = ws;

        ws.on('message', (message: WebSocket.Data) => {
          console.log(`Received message on channel ${channelId} from transmitter`);
          if (message instanceof Buffer) {
            channel!.receivers.forEach(receiver => {
              if (receiver.readyState === WebSocket.OPEN) {
                receiver.send(message);
              }
            });
          }
        });

        ws.on('close', () => {
          console.log(`Transmitter disconnected from channel ${channelId}`);
          channel!.transmitter = null;
        });
      } else if (type === 'receiver') {
        channel!.receivers.push(ws);

        ws.on('close', () => {
          console.log(`Receiver disconnected from channel ${channelId}`);
          const index = channel!.receivers.indexOf(ws);
          if (index !== -1) {
            channel!.receivers.splice(index, 1);
          }
        });
      }
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
