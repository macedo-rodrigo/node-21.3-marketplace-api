// first, we import the env variables
require("dotenv").config();
const DB_CONNECTION = process.env.DB_URL;
const DB_NAME = process.env.DB_NAME;

// in order to import and use our MongoDB database, we have to import mongoose
const mongoose = require("mongoose");

// we also need to setup the connection to MongoDB
const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  dbName: DB_NAME,
};

const connect = async () => {
  try {
    const database = await mongoose.connect(DB_CONNECTION, config);
    const name = database.connection.name;
    const host = database.connection.host;
    console.log(`Connected to database ${name} on host ${host}`);
    return database;
  } catch (error) {
    console.error(error);
    console.log("Connection error, trying to connect on 5s...");
    setTimeout(connect, 5000);
  }
};

module.exports = { connect };
