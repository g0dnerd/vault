// WebSocketGateway that acts as a websocket server
// for broadcasting match updates

import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { UpdateMatchDto } from './dto/update-match.dto';

// TODO: Specifiy CORS origins
@WebSocketGateway({
  namespace: '/matches',
  cors: { origin: ['192.168.2.65', '192.168.2.65:4200', 'http://localhost'] },
})
export class MatchGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.error(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.error(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateMatch')
  handleMatchUpdate(game: UpdateMatchDto) {
    // Broadcast the updated match to all connected clients
    console.error(`Received match update: ${JSON.stringify(game)}`);
    this.sendMatchUpdate(game);
  }

  // Method to trigger match updates from other parts of the application
  sendMatchUpdate(game: UpdateMatchDto) {
    console.error('Emitting match update');
    this.server.emit('matchUpdated', game);
  }
}
