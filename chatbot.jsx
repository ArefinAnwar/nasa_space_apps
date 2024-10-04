import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { View, TextInput, Button } from 'react-native';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello! Ask me anything about PACE data!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'Chatbot',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    // Send the user's message to the backend server

    // The PACE data will be fetched from the backend server
    // Backend server will be built using express and it will store various PACE data.
    // This is only a base code

    const userMessage = newMessages[0].text;
    fetch('https://your-backend-server.com/ask', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ question: userMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Receive chatbot's response and display it
        const botMessage = {
          _id: Math.random().toString(),
          text: data.answer,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Chatbot',
          },
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, botMessage)
        );
      })
      .catch((error) => {
        console.error('Error fetching chatbot response:', error);
      });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
};

export default Chatbot;
