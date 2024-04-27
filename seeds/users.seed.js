const mongoose = require("mongoose"); // first, we need to import Mongo functionalities
const { connect } = require("../db.js"); // obviously, i need to connect to my ddbb
const { User } = require("../models/User.js"); // the model is fundamental

const userList = [
  // the data itself
  {
    firstName: "Juan",
    lastName: "Martinez",
    email: "juan.martinez@example.com",
    password: "password123",
    phone: "+1234567890",
  },
  {
    firstName: "Maria",
    lastName: "Garcia",
    email: "maria.garcia@example.com",
    password: "securepass",
    phone: "+0987654321",
  },
  {
    firstName: "Carlos",
    lastName: "Lopez",
    email: "carlos.lopez@example.com",
    password: "MyP@ssw0rd",
    phone: "+1122334455",
  },
  {
    firstName: "Laura",
    lastName: "Rodriguez",
    email: "laura.rodriguez@example.com",
    password: "MySecret123",
    phone: "",
  },
  {
    firstName: "Pedro",
    lastName: "Sanchez",
    email: "pedro.sanchez@example.com",
    password: "p@55w0rd",
    phone: "+15551234567",
  },
  {
    firstName: "Ana",
    lastName: "Perez",
    email: "ana.perez@example.com",
    password: "AnaPass2023",
    phone: "",
  },
  {
    firstName: "Diego",
    lastName: "Fernandez",
    email: "diego.fernandez@example.com",
    password: "d1eg0P@ss",
    phone: "+11234567890",
  },
  {
    firstName: "Sofia",
    lastName: "Diaz",
    email: "sofia.diaz@example.com",
    password: "SofiaPass789",
    phone: "",
  },
  {
    firstName: "Elena",
    lastName: "Gomez",
    email: "elena.gomez@example.com",
    password: "ElenaPassword",
    phone: "+17778889999",
  },
  {
    firstName: "Daniel",
    lastName: "Martin",
    email: "daniel.martin@example.com",
    password: "MyDaniel123",
    phone: "",
  },
  {
    firstName: "Carmen",
    lastName: "Ruiz",
    email: "carmen.ruiz@example.com",
    password: "CarmenPass",
    phone: "+14445556666",
  },
  {
    firstName: "Pablo",
    lastName: "Hernandez",
    email: "pablo.hernandez@example.com",
    password: "P@bloSecure",
    phone: "",
  },
  {
    firstName: "Isabel",
    lastName: "Torres",
    email: "isabel.torres@example.com",
    password: "Isabel123",
    phone: "+15559887766",
  },
  {
    firstName: "Manuel",
    lastName: "Jimenez",
    email: "manuel.jimenez@example.com",
    password: "ManuPassword",
    phone: "+1987654321",
  },
  {
    firstName: "Lucia",
    lastName: "Moreno",
    email: "lucia.moreno@example.com",
    password: "LuciaPass789",
    phone: "",
  },
  {
    firstName: "Javier",
    lastName: "Alvarez",
    email: "javier.alvarez@example.com",
    password: "Javier1234",
    phone: "+12223334455",
  },
  {
    firstName: "Sara",
    lastName: "Romero",
    email: "sara.romero@example.com",
    password: "SaraPass",
    phone: "+14445557788",
  },
  {
    firstName: "Adrian",
    lastName: "Suarez",
    email: "adrian.suarez@example.com",
    password: "AdrianSecure",
    phone: "",
  },
  {
    firstName: "Eva",
    lastName: "Gutierrez",
    email: "eva.gutierrez@example.com",
    password: "EvaPass123",
    phone: "+11223344556",
  },
  {
    firstName: "Ruben",
    lastName: "Navarro",
    email: "ruben.navarro@example.com",
    password: "RubenPass",
    phone: "+19998887766",
  },
];

// from now on, I'm going to configure the seed and therefore use the libraries/file that I imported at the beginning of the file

const userSeed = async () => {
  try {
    await connect();
    console.log("Connection established!");

    // a seed is a restart, so when I run it, I wanna assure that any remain, old data that my collection has will be deleted.
    await User.collection.drop();
    console.log("Existing users deleted");

    // now, with a clean collection assured, i can add my data
    const documents = userList.map((user) => new User(user));

    // the use of "await User.insertMany(documents)" was the previous way, before needing to execute "save" because of bcrypt.
    for (let i = 0; i < documents.length; i++) {
      const document = documents[i];
      await document.save();
    }

    console.log("Users successfully created!");
  } catch (error) {
    console.error("ERROR AL CONECTAR CON LA BBDD");
    console.error(error);
  } finally {
    mongoose.disconnect(); // we log off from the database
  }
};

userSeed();
