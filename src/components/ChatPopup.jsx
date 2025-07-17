import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMessageCircle, FiX, FiSend, FiUsers, FiSmile, FiMinus } = FiIcons;

const ChatPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [username, setUsername] = useState('');
  const [isUsernameSet, setIsUsernameSet] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      username: 'Admin',
      message: 'Dobrodošli u chat! Ovdje se možete dopisivati s drugim posjetiocima.',
      timestamp: new Date(Date.now() - 60000),
      isSystem: true
    },
    {
      id: 2,
      username: 'Marko',
      message: 'Pozdrav svima! Ima li ko iskustva sa otvaranjem računa u Deutsche Bank?',
      timestamp: new Date(Date.now() - 45000),
      isSystem: false
    },
    {
      id: 3,
      username: 'Ana',
      message: 'Ja sam otvorila račun kod njih prošle godine. Proces je bio prilično jednostavan, samo trebaš Anmeldung i pasoš.',
      timestamp: new Date(Date.now() - 30000),
      isSystem: false
    }
  ]);
  const [onlineUsers] = useState(['Marko', 'Ana', 'Stefan', 'Milica']);
  
  const messagesEndRef = useRef(null);
  const chatInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && !isMinimized && isUsernameSet) {
      chatInputRef.current?.focus();
    }
  }, [isOpen, isMinimized, isUsernameSet]);

  // Simulacija novih poruka od drugih korisnika
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% šanse za novu poruku
        const randomMessages = [
          'Ima li ko iskustva sa zdravstvenim osiguranjem?',
          'Gdje mogu naći najbolje kupone za Deutsche Bahn?',
          'Preporučujem aplikaciju DB Navigator za javni saobraćaj!',
          'Oktoberfest ove godine je bio fantastičan!',
          'Ima li ko savjete za učenje njemačkog jezika?',
          'Berlin je nevjerojatan grad za mlade!',
          'Gdje mogu pronaći jeftine karte za muzejem?'
        ];
        const randomUsernames = ['Petar', 'Jovana', 'Nikola', 'Maja', 'Luka', 'Tamara'];
        
        const newMessage = {
          id: Date.now(),
          username: randomUsernames[Math.floor(Math.random() * randomUsernames.length)],
          message: randomMessages[Math.floor(Math.random() * randomMessages.length)],
          timestamp: new Date(),
          isSystem: false
        };
        
        setMessages(prev => [...prev, newMessage]);
      }
    }, 15000); // Svaka 15 sekundi

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      username: username,
      message: message.trim(),
      timestamp: new Date(),
      isSystem: false,
      isOwn: true
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) return;
    
    setIsUsernameSet(true);
    
    // Dodaj poruku dobrodošlice
    const welcomeMessage = {
      id: Date.now(),
      username: 'System',
      message: `${username} se pridružio/la chatu!`,
      timestamp: new Date(),
      isSystem: true
    };
    
    setMessages(prev => [...prev, welcomeMessage]);
  };

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('sr-RS', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(timestamp);
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2, type: 'spring', stiffness: 300 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button
          onClick={toggleChat}
          className={`relative bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 ${
            isOpen ? 'scale-0' : 'scale-100'
          }`}
        >
          <SafeIcon icon={FiMessageCircle} className="w-6 h-6" />
          
          {/* Notification dot */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
          
          {/* Online users count */}
          <div className="absolute -top-2 -left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            {onlineUsers.length}
          </div>
        </button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 right-6 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-primary-600 text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiUsers} className="w-5 h-5" />
                <div>
                  <h3 className="font-semibold">Chat Zajednica</h3>
                  <p className="text-xs text-primary-100">
                    {onlineUsers.length} online
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={minimizeChat}
                  className="p-1 hover:bg-primary-700 rounded transition-colors"
                >
                  <SafeIcon icon={FiMinus} className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-primary-700 rounded transition-colors"
                >
                  <SafeIcon icon={FiX} className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {!isMinimized && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: 'auto' }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  {/* Username Setup */}
                  {!isUsernameSet ? (
                    <div className="p-4 border-b">
                      <form onSubmit={handleUsernameSubmit}>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Unesite vaše ime za chat:
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Vaše ime..."
                            maxLength={20}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                            autoFocus
                          />
                          <button
                            type="submit"
                            className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                          >
                            <SafeIcon icon={FiSend} className="w-4 h-4" />
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      {/* Online Users */}
                      <div className="p-3 border-b bg-gray-50">
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <SafeIcon icon={FiUsers} className="w-4 h-4" />
                          <span>Online:</span>
                          <div className="flex flex-wrap gap-1">
                            {onlineUsers.slice(0, 3).map((user, index) => (
                              <span key={user} className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                                {user}
                              </span>
                            ))}
                            {onlineUsers.length > 3 && (
                              <span className="text-gray-500 text-xs">
                                +{onlineUsers.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="h-64 overflow-y-auto p-3 space-y-3">
                        {messages.map((msg) => (
                          <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[80%] ${
                              msg.isSystem
                                ? 'text-center text-gray-500 text-xs italic'
                                : msg.isOwn
                                ? 'bg-primary-600 text-white'
                                : 'bg-gray-100 text-gray-900'
                            } rounded-lg p-2`}>
                              {!msg.isSystem && (
                                <div className="text-xs font-semibold mb-1 opacity-75">
                                  {msg.username}
                                </div>
                              )}
                              <div className="text-sm">{msg.message}</div>
                              <div className={`text-xs mt-1 opacity-75 ${
                                msg.isSystem ? 'hidden' : ''
                              }`}>
                                {formatTime(msg.timestamp)}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Message Input */}
                      <div className="p-3 border-t bg-gray-50">
                        <form onSubmit={handleSendMessage} className="flex space-x-2">
                          <input
                            ref={chatInputRef}
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Napišite poruku..."
                            maxLength={500}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                          <button
                            type="submit"
                            disabled={!message.trim()}
                            className="bg-primary-600 text-white px-3 py-2 rounded-lg hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                          >
                            <SafeIcon icon={FiSend} className="w-4 h-4" />
                          </button>
                        </form>
                        <div className="text-xs text-gray-500 mt-1 text-center">
                          Chat je javno dostupan svim posjetiocima
                        </div>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatPopup;