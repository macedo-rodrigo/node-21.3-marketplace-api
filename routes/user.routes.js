const express = require("express");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token.js");

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

// for the login, I need a POST request in order to validate if both email and password provided are corrects
router.post("/login", async (req, res, next) => {
  console.log("entrada a la ruta");
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Email and Password fields must be fullfiled" });
    }
    // mais uma vez, localizamos o modelo correspondente
    const user = await User.findOne({ email }).select("+password"); // as password is a encrypted information, we have to call it using select function
    console.log("se ha encontrado el usuario: ", user);
    if (!user) {
      return res.status(401).json({ error: "credentials are not valid" });
    }

    // now, we check if the password is correct
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      // We remove password from the answer
      const userWithoutPass = user.toObject();
      delete userWithoutPass.password;

      // We generate JWT tokens
      const jwtToken = generateToken(user._id, user.email);

      return res.status(200).json({ token: jwtToken });
    } else {
      return res.status(401).json({ error: "Oops! The credentials are not valid" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = { userRouter: router };
