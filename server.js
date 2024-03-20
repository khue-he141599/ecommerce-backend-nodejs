const app = require("./src/app");

const PORT = 3333;

const server = app.listen(PORT, () => {
    console.log("Server listening on: ", PORT);
});

// process.on("SIGINT", () => {
//     server.close(() => {
//         console.log("Exit server express");
//     });
// });
