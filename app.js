const express = require("express");

const app = express();
app.use(express.json());

const itemRoutes = require("./routes/itemRoutes");
app.use("/items", itemRoutes);

module.exports = app;