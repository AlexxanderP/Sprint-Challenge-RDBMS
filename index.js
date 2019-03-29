const server = require("./api/server.js");

const port = 6500;

server.listen(port, () => {
  console.log(
    `\n*** Sprint-Challenge-RDBMS API is listening on http://localhost:${port} ***\n`
  );
});
