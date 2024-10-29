import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

import { UpdateMatchDto } from './dto/update-match.dto';

// WebSocketGateway that acts as a websocket server
// for broadcasting match updates
// TODO: Specifiy CORS origins
@WebSocketGateway({
  cors: { origin: '*' },
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
