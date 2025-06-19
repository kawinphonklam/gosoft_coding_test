// // * You may uncomment one of these modules:
// const express = require('express');
// // const koa = require('koa');
// // const hapi = require('@hapi/hapi');
// // const restify = require('restify');

// module.exports = (stepService) => {
//   const REST_PORT = 8080;

//   // * TODO: Write the GET endpoint, using `stepService` for data access
//   // * TODO: Return object containing `close()` method for shutting down the server

// };

const express = require("express");

module.exports = (stepService) => {
  const REST_PORT = 8080;
  const app = express();

  app.get("/users/:username/steps", (req, res) => {
    const pathParam = req.params.username;
    // Get data for user
    const userData = stepService.get(pathParam);

    // Check if user not found return 404
    if (!userData || !userData.ts || !userData.cumulativeSteps) {
      return res.status(404).json({ error: "User doesn't exist" });
    }

    return res.status(200).json(userData);
  });

  const server = app.listen(REST_PORT);

  return {
    close: () => server.close(),
  };
};
