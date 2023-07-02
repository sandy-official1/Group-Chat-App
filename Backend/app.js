const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const userroute = require("./routes/signupRoutes");
const database = require("./utils/database");
const mysql = require("mysql2");

const cors = require("cors");
app.use(cors());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

const usertable = require("./models/User");
// Other middleware and configurations

app.use(userroute);

// Sync the database and start the server
// Start the server
database
  .sync({ force: false })
  .then(() => {
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.log("error" + err);
  });
