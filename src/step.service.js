// // * TODO: Implement function for updating user's step data in store
// // * TODO: Function for getting user's step data may need some adjustments
// module.exports = function stepService(store) {
//   const service = {};

//   service.get = (username) => store[username];

//   service.add = (username, ts, newSteps) => {
//     // Assume that `store` is initially an empty object {}. An example `store` is:
//     // {
//     //   jenna: {
//     //     ts: 1503256778463,
//     //     cumulativeSteps: 12323,
//     //   },
//     //   james: {
//     //     ts: 1503256824767,
//     //     cumulativeSteps: 587,
//     //   },
//     // }

//   };

//   return service;
// };

module.exports = function stepService(store) {
  const service = {};

  service.get = (username) => {
    // Get existing user
    return Object.prototype.hasOwnProperty.call(store, username)
      ? store[username]
      : undefined;
  };

  service.add = (username, ts, newSteps) => {
    // Add new user to store
    if (!store[username]) {
      store[username] = { ts, cumulativeSteps: newSteps };
      return;
    }
    // Update existing user
    if (ts > store[username].ts) {
      store[username].cumulativeSteps += newSteps;
      store[username].ts = ts;
    }
  };
  return service;
};
