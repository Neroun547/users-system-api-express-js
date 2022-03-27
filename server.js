const { port } = require("./config.json");
const middleware = require("./middleware/middleware");
const express = require("express");
const app = express();

app.use(middleware);

app.listen(port, () => {
    console.log(`Server was started on port: ${port}`);
});
