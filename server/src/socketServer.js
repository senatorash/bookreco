const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./helpers/socket/socketHelpers");
const messageFormat = require("./helpers/socket/messageFormat");
const runGeminiConversation = require("./helpers/socket/gemini/gemini");

const listen = async (io) => {
  const bot = { name: "Bookreco" };

  io.on("connection", (socket) => {
    socket.on("joinRoom", ({ userData, room }) => {
      const user = userJoin(socket.id, userData, room);
      socket.join(user.room);

      if (user.room === userData.firstName) {
        socket.emit(
          "message",
          messageFormat(
            bot.name,
            `Hello ${userData.firstName}, welcome to Bookreco!.  How can I help you today?`,
            undefined,
            "new-msg"
          )
        );
      }
    });

    socket.on("chatMessage", async (msg) => {
      const user = getCurrentUser(socket.id);

      io.to(user.room).emit(
        "message",
        messageFormat(user.userData.username, msg.message)
      );

      const response = await runGeminiConversation(msg.message);

      if (response) {
        io.to(user.room).emit(
          "message",
          messageFormat(bot.name, response.replace(/\*/g, ""), undefined)
        );
      }
    });

    socket.on("leaveRoom", ({ userData, room }) => {
      const user = userLeave(userData.username);
      if (user) {
        socket.broadcast
          .to(room)
          .emit(
            "message",
            messageFormat(
              bot.name,
              `${userData.usernaem} has left the chat`,
              undefined
            )
          );

        io.to(room).emit("roomUsers", {
          room: user.room,
          users: getRoomUsers(room),
        });
      }
    });
  });
};

module.exports = listen;
