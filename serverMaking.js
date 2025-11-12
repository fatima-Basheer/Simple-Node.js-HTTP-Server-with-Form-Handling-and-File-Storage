const http = require("http");
const requestHandler=require('./buffers')
const server = http.createServer(requestHandler)

const port = 3000;
server.listen(port, () => {
  console.log(`Server has started at http://localhost:${port}`);
});
