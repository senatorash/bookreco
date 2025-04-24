const http = require("http");
// const { Server } = require("socket.io");
// const listen = require("./socketServer");
const envVariables = require("./config/index");
const app = require("./app");
const connectDb = require("./helpers/db");
const httpServer = http.createServer(app);

const { PORT } = envVariables;

// const io = new Server(httpServer, {
//   cors: {
//     origin: ["http://localhost:3000", "https://bookreco.vercel.app"],
//   },
// });

const startServer = async () => {
  await connectDb();
  httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

  // listen(io);
};

startServer();
