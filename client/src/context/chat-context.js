import { useState, createContext, useRef } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { setCurrentUser } from "../lib/redux/userSlice";

export const ChatContext = createContext();

const ChatContextProvider = () => {
  const API_URL = "http://localhost:3001";

  const socket = useRef(io(API_URL));

  const updateCurrentUser = () => {
    const user = useSelector((state) => state.user);

    if (!user) {
      setCurrentUser;
    }
  };
};

export default ChatContextProvider;
