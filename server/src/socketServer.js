const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./helpers/socket/socketHelpers");
const messageFormat = require("./helpers/socket/messageFormat");

const geminiConversation = require("./helpers/socket/gemini/gemini");

const listen = async (io) => {
  const bot = { name: "BookrecoAI" };

  io.on("connection", (socket) => {
    console.log("user is connected");

    socket.on("joinRoom", ({ userData, room }) => {
      const user = userJoin(socket.id, userData, room);
      socket.join(user.room);

      if (user.room === user?.firstName) {
        socket.emit(
          "message",
          messageFormat(
            bot.name,
            `Hello ${userData.firstName}, welcome to Bookreco AI, the best voice interacttive AI. How can I help you today?`,
            undefined,
            "new-msg"
          )
        );
      }
    });

    socket.on("chatMessage", async (msg) => {
      console.log(msg);
      const user = getCurrentUser(userData);

      console.log(user);
      if (user) {
        io.to(user.room).emit(
          "message",
          messageFormat(user?.firstName, msg.message)
        );

        const response = await geminiConversation(msg.message);

        if (response) {
          io.to(user.room).emit(
            "message",
            messageFormat(bot.name, response.replace(/\*/g, ""), undefined)
          );
        }
      }
    });
  });
};

module.exports = listen;
