// const WebSocketServer = require('ws').Server;

// module.exports = (stepService) => {
//   const WEBSOCKET_PORT = 8081;

//   // * TODO: Write the WebSocket API for receiving `update`s,
//   //         using `stepService` for data persistence.
//   // * TODO: Make sure to return an instance of a WebSocketServer,
//   //         which contains `close()` method.

//   return wsServer;
// };

const WebSocketServer = require("ws").Server;

module.exports = (stepService) => {
  const WEBSOCKET_PORT = 8081;
  const wsServer = new WebSocketServer({ port: WEBSOCKET_PORT });

  wsServer.on("connection", (ws) => {
    ws.on("message", (data) => {
      try {
        // Parse data
        const parsedData = JSON.parse(data);
        const { update_id, username, ts, newSteps } = parsedData;

        // Validate data
        if (
          update_id &&
          username &&
          typeof ts === "number" &&
          typeof newSteps === "number"
        ) {
          stepService.add(username, ts, newSteps);
        }
      } catch (err) {
        // Log error
        console.log(err);
      }
    });
  });

  return wsServer;
};
