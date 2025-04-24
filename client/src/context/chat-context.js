// import { useRef, useState, useEffect, createContext } from "react";
// import { io } from "socket.io-client";
// import { useSelector } from "react-redux";
// import { getRoomUsers } from "../../../server/src/helpers/socket/socketHelpers";

// export const ChatContext = createContext({
//   socketMessages: [],
//   sendMessage: (messageData) => {},
//   joinRoom: (userData, room) => {},
//   leaveRoom: (userData, room) => {},
//   getRoomUsers: () => {},
// });

// const API_URL = "http://localhost:3001";

// const ChatContextProvider = ({ children }) => {
//   const [socketMessages, setSocketMessages] = useState([]);
//   const [roomUsers, setRoomUsers] = useState([]);

//   const { user } = useSelector((state) => state.userState);
//   console.log(user);
//   const socket = useRef(io(API_URL));

//   const joinRoom = () => {
//     socket?.current?.emit("joinRoom", {
//       userData: { username: user?.firstName },
//       room: user?.firstName,
//     });
//   };

//   const sendMessage = async (messageData) => {
//     socket?.current?.emit("chatMessage", messageData);
//   };

//   useEffect(() => {
//     socket?.current?.on("message", (msg) => {
//       if (msg.type || msg.type === "new-msg") {
//         return setSocketMessages([msg]);
//       }
//       setSocketMessages((socketMessages) => [...socketMessages, msg]);
//     });
//     return () => socket?.current?.off("message");
//   }, [socket]);

//   // const getRoomUsers = () => {
//   //   socket?.current?.on("roomUsers", ({ room, user }) => {
//   //     setRoomUsers(user);
//   //   });
//   // };

//   const value = {
//     sendMessage,
//     joinRoom,
//     socketMessages,
//   };
//   return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
// };

// export default ChatContextProvider;
