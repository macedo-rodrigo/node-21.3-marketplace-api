const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt"); // so i can encrypt confidential data
const Schema = mongoose.Schema; // in order to create my model, I need a new Schema

// here we go. let's create the user Schema (that's an object)
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      requiere: true,
    },
    lastName: {
      type: String,
      trim: true,
      requiere: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true, // Este dato no se puede repetir
      validate: {
        validator: validator.isEmail,
        message: "This e-mail is not valid",
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      minLength: [8, "The password must be at least 8 characters long."],
      select: false, // this field will no longer appear at get requests
    },
    phone: {
      type: String,
      required: false,
      trim: true,
    },
  },
  {
    timestamps: true, // so I can have the creation and modification dates on Mongo
  }
);

userSchema.pre("save", async function (next) {
  try {
    // Encrypting the password only in case it was modified
    if (this.isModified("password")) {
      const saltRounds = 10;
      const passwordEncrypted = await bcrypt.hash(this.password, saltRounds); // We use await because we cannot move on until it's done
      this.password = passwordEncrypted;
    }

    next();
  } catch (error) {
    next(error);
  }
});

// userSchema.add("create", async (firstName, lastName, email, password) => {
// const user = { firstName, lastName, email, password };
// const userCreated = userSchema.add(user);
// return userCreated;
// });

const User = mongoose.model("User", userSchema);
module.exports = { User };
