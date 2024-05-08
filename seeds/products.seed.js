const mongoose = require("mongoose");
const { connect } = require("../db.js");
const { Product } = require("../models/Products.js");

const productList = [
  {
    productName: "Laptop HP Pavilion",
    status: "new",
    seller: "John Doe",
  },
  {
    productName: "iPhone 13 Pro",
    status: "new",
    seller: "Alice Smith",
  },
  {
    productName: "Monitor Samsung 27 pulgadas",
    status: "new",
    seller: "David Brown",
  },
  {
    productName: "PS5",
    status: "new",
    seller: "Emily Johnson",
  },
  {
    productName: "Libro: El Código Da Vinci",
    status: "used",
    seller: "Michael Lee",
  },
  {
    productName: "Zapatos Nike Air Max",
    status: "new",
    seller: "Sophia Garcia",
  },
  {
    productName: "Cámara Canon EOS Rebel T7",
    status: "new",
    seller: "Ethan Martinez",
  },
  {
    productName: "Mesa de madera maciza",
    status: "used",
    seller: "Olivia Taylor",
  },
  {
    productName: "Silla de oficina ergonómica",
    status: "new",
    seller: "James Wilson",
  },
  {
    productName: "Película: Avengers Endgame",
    status: "used",
    seller: "Emma Anderson",
  },
  {
    productName: "Gafas de sol Ray-Ban Aviator",
    status: "new",
    seller: "Benjamin White",
  },
  {
    productName: "Guitarra eléctrica Fender Stratocaster",
    status: "new",
    seller: "Ava Martinez",
  },
  {
    productName: "Refrigeradora LG Inverter",
    status: "new",
    seller: "William Harris",
  },
  {
    productName: "Mochila para laptop SwissGear",
    status: "new",
    seller: "Isabella Thomas",
  },
  {
    productName: "Camiseta Adidas Originals",
    status: "new",
    seller: "Mia Robinson",
  },
  {
    productName: "Juego de mesa Catan",
    status: "used",
    seller: "Alexander Hall",
  },
  {
    productName: "Bicicleta de montaña Trek",
    status: "new",
    seller: "Charlotte Davis",
  },
  {
    productName: "Aspiradora Dyson V11",
    status: "new",
    seller: "Noah Rodriguez",
  },
  {
    productName: "Smartwatch Samsung Galaxy Watch",
    status: "new",
    seller: "Amelia Martinez",
  },
  {
    productName: "Tabla de cortar de bambú",
    status: "used",
    seller: "Lucas Brown",
  },
];

const productSeed = async () => {
  try {
    await connect();
    console.log("Connection established!");

    // a seed is a restart, so when I run it, I wanna assure that any remain, old data that my collection has will be deleted.
    await Product.collection.drop();
    console.log("Existing products deleted");

    // now, with a clean collection assured, i can add my data
    const documents = productList.map((product) => new Product(product));

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

productSeed();
