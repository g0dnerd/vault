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
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('updateMatch')
  handleMatchUpdate(game: UpdateMatchDto) {
    // Broadcast the updated match to all connected clients
    this.sendMatchUpdate(game);
  }

  // Method to trigger match updates from other parts of the application
  sendMatchUpdate(game: UpdateMatchDto) {
    this.server.emit('matchUpdated', game);
  }
}
