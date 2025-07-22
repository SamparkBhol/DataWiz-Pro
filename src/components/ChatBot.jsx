import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, CornerDownLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! I am the DataWiz Assistant. Ask me about data preprocessing, EDA, or feature engineering!' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const getBotResponse = (userInput) => {
    const lowerCaseInput = userInput.toLowerCase();
    if (lowerCaseInput.includes("preprocess")) {
      return "Data preprocessing is key! It involves cleaning and transforming raw data. Think handling missing values, scaling features, and encoding categorical data to make it model-ready.";
    }
    if (lowerCaseInput.includes("eda") || lowerCaseInput.includes("exploratory")) {
      return "Exploratory Data Analysis (EDA) is like being a data detective. You use stats and visualizations to summarize the main characteristics of your dataset, spot anomalies, and uncover relationships.";
    }
    if (lowerCaseInput.includes("feature engineering")) {
      return "Feature engineering is where the magic happens! It's the art of creating new, informative features from existing data to boost the performance of your machine learning models.";
    }
    if (lowerCaseInput.includes("hello") || lowerCaseInput.includes("hi")) {
      return "Hi there! How can I assist with your data questions today?";
    }
     if (lowerCaseInput.includes("thank")) {
      return "You're welcome! Let me know if there is anything else I can help with.";
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userMessage = inputValue.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { from: 'user', text: userMessage }]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const botResponse = getBotResponse(userMessage);
      if (botResponse) {
        setMessages((prev) => [...prev, { from: 'bot', text: botResponse }]);
      } else {
         setMessages((prev) => [...prev, { from: 'bot', text: "I'm still learning! While I can't answer that, I'm great at explaining concepts like data preprocessing, EDA, and feature engineering. Try asking me about one of those!" }]);
      }
      setIsLoading(false);
    }, 1500);
  };
  

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="icon"
          className="rounded-full w-16 h-16 bg-cyan-600 hover:bg-cyan-700 shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-slate-900/80 backdrop-blur-xl border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-slate-700">
              <h3 className="font-bold text-white text-center">DataWiz Assistant</h3>
            </div>
            <div className="flex-1 p-4 space-y-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <motion.div 
                  key={index} 
                  className={`flex items-end gap-2 ${msg.from === 'bot' ? 'justify-start' : 'justify-end'}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {msg.from === 'bot' && <Bot className="w-6 h-6 text-cyan-400 flex-shrink-0" />}
                  <div className={`max-w-[80%] p-3 rounded-xl ${msg.from === 'bot' ? 'bg-slate-700 text-white rounded-bl-none' : 'bg-cyan-600 text-white rounded-br-none'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                 <motion.div 
                  className="flex items-end gap-2 justify-start"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Bot className="w-6 h-6 text-cyan-400" />
                  <div className="bg-slate-700 p-3 rounded-xl rounded-bl-none">
                    <motion.div className="flex items-center gap-1.5"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        visible: { transition: { staggerChildren: 0.2 } }
                      }}
                    >
                      <motion.span className="w-2 h-2 bg-cyan-400 rounded-full" variants={{hidden: {opacity:0}, visible: {opacity:1}}}/>
                      <motion.span className="w-2 h-2 bg-cyan-400 rounded-full" variants={{hidden: {opacity:0}, visible: {opacity:1}}}/>
                      <motion.span className="w-2 h-2 bg-cyan-400 rounded-full" variants={{hidden: {opacity:0}, visible: {opacity:1}}}/>
                    </motion.div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-slate-700">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Ask a question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <Button type="submit" size="icon" className="bg-cyan-500 hover:bg-cyan-600" disabled={isLoading || !inputValue}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;