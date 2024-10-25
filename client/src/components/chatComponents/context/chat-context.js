import { useState, createContext, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const ChatContext = createContext();

const ChatContextProvider = () => {
  const API_URL = "http://localhost:3001";

  const socket = useRef(io(API_URL));

  const updateCurrentUser = () => {
    const user = useSelector((state) => state.user);
  };
};

export default ChatContextProvider;
