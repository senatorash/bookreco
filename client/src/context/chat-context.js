import { useState, createContext, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const ChatContext = createContext({
  users: [],
  messages: [],
  updateCurrentUser: (firstName) => {},
  joinRoom: (firstName, room) => {},
  sendMessage: (message, firstName) => {},
  listenToChatMessage: () => {},
});

const ChatContextProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);

  const { user } = useSelector((state) => state.userState);
  const API_URL = "http://localhost:3001";

  useEffect(() => {
    setUsers(user);
  }, [user]);

  const socket = useRef(null); // Ref to manage the socket instance

  useEffect(() => {
    // Initialize the socket connection when the component mounts
    socket.current = io(API_URL);

    // Listen for updates on users in the room
    socket.current.on("roomUsers", (roomData) => {
      setUsers(roomData.users || []); // Update the users state with room data
    });

    // Cleanup: Disconnect the socket when the component unmounts
    return () => {
      socket?.current?.disconnect();
    };
  }, [API_URL]);

  const updateCurrentUser = (firstName) => {
    if (socket?.current) {
      socket.current.emit("updateUser", { firstName });
    }
  };

  const joinRoom = (firstName, room) => {
    if (socket?.current) {
      socket?.current?.emit("joinRoom", { firstName, room });
    }
  };

  socket?.current?.on("roomUsers", (roomData) => {
    if (socket?.current) {
      setUsers(roomData.users || []);
    }
  });

  // emit chat message event to the socket server
  const sendMessage = (message, firstName) => {
    socket?.current?.emit("chatMessage", { message, firstName });
  };

  // listen to  messages event emitted from socket server
  const listenToChatMessage = () => {
    socket?.current?.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
  };

  const value = {
    user,
    messages,
    updateCurrentUser,
    joinRoom,
    sendMessage,
    listenToChatMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
export default ChatContextProvider;
