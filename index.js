const express = require("express");
const app = express();
const server = require("http").Server(app);

const envPath = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";

require("dotenv").config({ path: envPath });

app.set("PORT", process.env.PORT);

server.listen(process.env.PORT, () => {
  console.log(`Server started in port ${app.get("PORT")}`);
});

require("./api/controllers/controllers")(app);

module.exports = app;
