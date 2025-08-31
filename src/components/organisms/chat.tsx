import { useContext, useEffect, useState, useRef } from "react";
import { UserContext } from "../../contexts/user.context";
import { services } from "../../services/services";
import { webSocketService } from "../../services/websocket.service";
import { ChatScheme } from "../../schemes/chat/chat.scheme";
import { ChatMessageScheme } from "../../schemes/chat/chat-message.scheme";
import Container from "../atoms/container";
import { Typography } from "../atoms/typography";
import { Input } from "../atoms/input";
import { Button } from "../atoms/button";
import { Avatar, AvatarFallback, AvatarImage } from "../atoms/avatar";
import { Badge } from "../atoms/badge";
import { format } from "date-fns";
import { Dialog } from "@radix-ui/react-dialog";
import { DialogContent, DialogTitle } from "../atoms/dialog";

interface ChatProps {
  chatId: number;
  onClose: () => void;
}

const Chat = ({ chatId, onClose }: ChatProps) => {
  const { user } = useContext(UserContext);
  const [chat, setChat] = useState<ChatScheme | null>(null);
  const [messages, setMessages] = useState<ChatMessageScheme[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!user) return;

    const connectWebSocket = async () => {
      try {
        console.log('🔄 Attempting to connect WebSocket for user:', user.id);
        await webSocketService.connect(user.id.toString());
        setConnected(true);
        
        // Subscribe to messages
        const unsubscribe = webSocketService.subscribeToMessages(user.id.toString(), (message: ChatMessageScheme) => {
          console.log('📨 Received real-time message:', message);
          // Only add if it's not from current user (to avoid duplicates)
          if (message.sender.id !== user.id) {
            setMessages(prev => {
              // Check if message already exists to avoid duplicates
              const exists = prev.some(msg => msg.id === message.id);
              if (!exists) {
                return [...prev, message];
              }
              return prev;
            });
          }
        });
        
        unsubscribeRef.current = unsubscribe;
      } catch (error) {
        console.error('❌ Failed to connect to WebSocket:', error);
        setConnected(false);
      }
    };

    connectWebSocket();

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
      webSocketService.disconnect();
    };
  }, [user]);

  useEffect(() => {
    const fetchChatData = async () => {
      try {
        setLoading(true);
        
        // Fetch chat details
        const chatData = await services.get<ChatScheme>({
          url: `/chats/${chatId}`,
        });
        if (chatData) {
          console.log('💬 Chat data loaded:', chatData);
          setChat(chatData);
        }

        // Fetch messages
        const messagesData = await services.get<ChatMessageScheme[]>({
          url: `/chats/${chatId}/messages`,
        });
        if (messagesData) {
          console.log('📜 Messages loaded:', messagesData.length);
          setMessages(messagesData);
        }
        
      } catch (error) {
        console.error('❌ Failed to fetch chat data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchChatData();
  }, [chatId]);

  const sendMessage = async () => {
    if (!newMessage.trim() || !user) return;

    const messageData = {
      content: newMessage,
      sender: { id: user.id },
    };

    try {
      // Send via HTTP API first
      const sentMessage = await services.post<ChatMessageScheme>({
        url: `/chats/${chatId}/messages`,
        data: messageData,
      });

      if (sentMessage) {
        console.log('✅ Message sent via HTTP:', sentMessage);
        // Add to local state immediately for sender
        setMessages(prev => [...prev, sentMessage]);
        setNewMessage("");
        
        // Also send via WebSocket for real-time delivery to other user
        if (webSocketService.isConnected()) {
          webSocketService.sendMessage({
            ...messageData,
            chatId: chatId
          });
        }
      }
    } catch (error) {
      console.error('❌ Failed to send message:', error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Show loading state while fetching data
  if (loading || !user || !chat) {
    return (
      <Container className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
        <div className="flex items-center justify-between p-4 border-b">
          <Typography variant="h3">Carregando chat...</Typography>
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Typography variant="small" className="text-gray-500">
            Carregando...
          </Typography>
        </div>
      </Container>
    );
  }

  // Safely determine the other user
  const otherUser = chat.user1?.id === user.id ? chat.user2 : chat.user1;

  // If we still don't have the other user, show error
  if (!otherUser) {
    return (
      <Container className="fixed inset-0 bg-white z-50 flex flex-col h-screen">
        <div className="flex items-center justify-between p-4 border-b">
          <Typography variant="h3">Erro no chat</Typography>
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <Typography variant="small" className="text-red-500">
            Erro ao carregar dados do chat. Tente novamente.
          </Typography>
        </div>
      </Container>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className=" flex flex-col h-3/4">
      {/* Chat Header */}
      <DialogTitle className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={otherUser.photo} alt={otherUser.name} />
            <AvatarFallback>{otherUser.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>
          <div>
            <Typography variant="h3">{otherUser.name}</Typography>
            <Typography variant="small" className="text-gray-500">
              {otherUser.town} - {otherUser.state}
            </Typography>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge>
            {connected ? "Conectado" : "Desconectado"}
          </Badge>
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </div>
      </DialogTitle>

      {/* Meeting Info */}
      {chat.meeting && (
        <div className="p-4 bg-gray-50 border-b">
          <Typography variant="h4">Sobre o encontro: {chat.meeting.name}</Typography>
          <Typography variant="small" className="text-gray-600">
            {chat.meeting.description}
          </Typography>
          <Typography variant="small" className="text-gray-500">
            Data: {format(new Date(chat.meeting.date), "PPP")} | Tipo: {chat.meeting.type}
          </Typography>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            <Typography variant="small">
              Nenhuma mensagem ainda. Inicie a conversa!
            </Typography>
          </div>
        )}
        {messages.map((message) => {
          const isCurrentUser = message.sender.id === user.id;
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                <Typography variant="small">{message.content}</Typography>
                <Typography
                  variant="small"
                  className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {format(new Date(message.sentAt), "HH:mm")}
                </Typography>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua mensagem..."
            className="flex-1"
          />
          <Button onClick={sendMessage} disabled={!newMessage.trim()}>
            Enviar
          </Button>
        </div>
      </div>
    </DialogContent>
    </Dialog>
    
  );
};

export default Chat;