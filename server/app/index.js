const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./database/db");
require("dotenv").config();
const models = require("./models");
const passport = require("passport");
const cookieParser = require("cookie-parser");

//import passport middleware
require("./middlewares/passport-middleware");

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(passport.initialize());

// routes
app.use("/dev", require("./routes/dev"));
app.use("/beers", require("./routes/beer"));
app.use("/wines", require("./routes/wine"));
app.use("/spirits", require("./routes/spirit"));
app.use("/products", require("./routes/products"));
app.use("/favorites", require("./routes/favorites"));
app.use("/carts", require("./routes/cart"));
app.use("/auth", require("./routes/auth"));

// db connection
(async () => {
  try {
    await db.sync({
      models,
      force: false,
      alter: true,
    });
    console.log("Server has started on port 5000");
    app.listen(process.env.EXTERNAL_PORT || 5000);
  } catch (error) {
    console.error(error);
  }
})();
