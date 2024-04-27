const express = require("express");
const cors = require("cors"); // middleware library for connection

const main = async () => {
  // database connection
  const { connect } = require("./db.js"); // the function we exported on db.js
  const database = await connect();

  // app/server setup
  const PORT = 3000;
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "http://localhost:3000", // this is now a valid port to make requests from
    })
  );

  // middlewares
  app.use((req, res, next) => {
    // this one counts for all requests (as there is no route applied)
    const date = new Date();
    console.log(`A REQUEST WAS MADE! TYPE: ${req.method}, URl ${req.originalUrl}, DATE: ${date}`);
    next(); // so the app can continue running
  });

  // routes
  const router = express.Router(); // so I can apply routes using router.get
  router.get("/", (req, res) => {
    res.send(`This is the home of our API. We are using the ${database.connection.name} database.`);
  });
  router.get("*", (req, res) => {
    res.status(404).send("Sorry :( We have not found the requested page.");
  });

  // Our routes
  app.use("/", router);

  // this middleware will manage errors (the catch part of all routes)
  app.use((err, req, res, next) => {
    console.log("***** ERROR  *****");
    console.log(`This ${req.method} request to the URl ${req.originalUrl} has failed`);
    console.log(err);
    console.log("***** FIN DEL ERROR  *****");

    if (err?.name === "ValidationError") {
      res.status(400).json(err);
    } else if (err.errmsg?.indexOf("duplicate key") !== -1) {
      console.log("error duplicadoooo");
      res.status(400).json({ error: err.errmsg });
    } else {
      next(err);
    }
  });

  app.listen(PORT, () => {
    console.log(`app levantado en el puerto ${PORT}`);
  });
};

main();
