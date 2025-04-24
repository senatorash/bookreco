// import { useContext, useEffect, useRef } from "react";
// import { useSearchParams } from "react-router-dom";
// import { ChatContext } from "../../context/chat-context";

// const Chat = () => {
//   const [searchParams] = useSearchParams();
//   const room = searchParams.get("room");

//   const chatCtx = useContext(ChatContext);
//   const messageRef = useRef();

//   useEffect(() => {
//     chatCtx.getRoomUsers();
//   }, []);

//   useEffect(() => {
//     if (room) {
//       chatCtx.joinRoom("Guest", room);
//     }
//   }, [room]);

//   const sendMessageHandler = (event) => {
//     event.preventDefault();
//     const message = messageRef.current.value;

//     if (!message) return;

//     chatCtx.sendMessage(message);
//     messageRef.current.value = "";
//   };

//   return (
//     <div>
//       <form onSubmit={sendMessageHandler}>
//         <input
//           className="form-control"
//           placeholder="Enter Message"
//           ref={messageRef}
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chat;
