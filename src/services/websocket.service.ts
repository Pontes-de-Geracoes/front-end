import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { ChatMessageScheme } from '../schemes/chat/chat-message.scheme';

export class WebSocketService {
  private client: Client | null = null;
  private connected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // If already connected, resolve immediately
      if (this.connected && this.client) {
        resolve();
        return;
      }

      // Disconnect existing client if any
      this.disconnect();

      this.client = new Client({
        webSocketFactory: () => {
          const wsUrl = process.env.REACT_APP_WEBSOCKET_URL || 'http://localhost:8080/ws';
          return new SockJS(wsUrl);
        },
        connectHeaders: {
          userId: userId,
        },
        debug: (str) => {
          console.log('STOMP Debug: ' + str);
        },
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('✅ Connected to WebSocket');
          this.connected = true;
          this.reconnectAttempts = 0;
          resolve();
        },
        onStompError: (frame) => {
          console.error('❌ STOMP Error:', frame.headers['message']);
          console.error('Additional details:', frame.body);
          this.connected = false;
          reject(new Error('WebSocket connection failed: ' + frame.headers['message']));
        },
        onWebSocketClose: () => {
          console.log('🔌 WebSocket connection closed');
          this.connected = false;
        },
        onWebSocketError: (error) => {
          console.error('🚨 WebSocket Error:', error);
          this.connected = false;
          if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            console.log(`🔄 Reconnection attempt ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);
          } else {
            reject(new Error('Max reconnection attempts reached'));
          }
        }
      });

      try {
        this.client.activate();
      } catch (error) {
        console.error('Failed to activate WebSocket client:', error);
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.client) {
      this.client.deactivate();
      this.client = null;
    }
    this.connected = false;
    this.reconnectAttempts = 0;
  }
  subscribeToMessages(userId: string, callback: (message: ChatMessageScheme) => void): () => void {
    if (!this.client || !this.connected) {
      console.warn('⚠️ Cannot subscribe: WebSocket not connected');
      return () => {};
    }

    try {
      const subscription = this.client.subscribe(`/user/${userId}/queue/messages`, (message) => {
        try {
          const parsedMessage = JSON.parse(message.body);
          console.log('📨 Received message:', parsedMessage);
          callback(parsedMessage);
        } catch (error) {
          console.error('Failed to parse message:', error);
        }
      });

      console.log(`🔔 Subscribed to /user/${userId}/queue/messages`);
      
      // Return unsubscribe function
      return () => {
        subscription.unsubscribe();
        console.log(`🔕 Unsubscribed from /user/${userId}/queue/messages`);
      };
    } catch (error) {
      console.error('Failed to subscribe to messages:', error);
      return () => {};
    }
  }

  sendMessage(message: any): void {
    if (!this.client || !this.connected) {
      console.warn('⚠️ Cannot send message: WebSocket not connected');
      return;
    }

    try {
      this.client.publish({
        destination: '/app/chat.sendMessage',
        body: JSON.stringify(message)
      });
      console.log('📤 Message sent:', message);
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  }

  isConnected(): boolean {
    return this.connected && this.client !== null;
  }
}

export const webSocketService = new WebSocketService();