import connect from 'socket.io-client';

export class SocketClient {

  static token: string = '';
  static email: string = '';

  static socket: SocketIOClient.Socket = connect('ws://localhost:3000');

  static reconnect() {
    SocketClient.socket.connect();
  }
}
