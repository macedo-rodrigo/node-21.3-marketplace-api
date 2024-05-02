const express = require("express");

// in order to show data throught a route, I need a model
const { User } = require("../models/User");

// a router for /user...
const router = express.Router();

// now I can start with the CRUD
// EXEMPLE OF A REQUEST WITH QUERY PARAMS: http://localhost:3000/user?page=1&limit=10
router.get("/", async (req, res, next) => {
  try {
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit) : 10;

    // now i can handle the url, i have to connect to the ddbb for finding specific data
    const users = await User.find()
      .limit(limit)
      .skip((page - 1) * limit);

    // Total number of elements (users)
    const totalElements = await User.countDocuments();

    const response = {
      totalItems: totalElements,
      totalPages: Math.ceil(totalElements / limit),
      currentPage: page,
      data: users,
    };

    res.json(response);
  } catch (error) {
    next(error);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    // request data
    const email = req.body.email;
    const emailExists = await User.findOne({ email });

    if (!emailExists) {
      const user = new User(req.body);
      const newUser = await user.save();
      return res.status(201).json(newUser).send("The user has been registered!");
    } else {
      console.log("Ya existe un user con este correo! Prueba con otro!");
      res.status(401).send(`The email ${emailExists} already existis!`);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter: router };
