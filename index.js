const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
require("./startup/logging")();
require("./startup/dbConfig");
require("./startup/validation")();
require("./startup/route")(app);
dotenv.config({ path: "./config.env" });

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(`${__dirname}/public`));

const port = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("Hello World!"));

app.listen(port, () => console.log(`App listening on port ${port}!`));
