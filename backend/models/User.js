const mongoose =
  require("mongoose");

/*
  USER SCHEMA
*/

const userSchema =
  new mongoose.Schema(
    {
      /*
        FULL NAME
      */

      name: {
        type: String,

        required: true,

        trim: true,
      },

      /*
        VULNPROBE ID
      */

      email: {
        type: String,

        required: true,

        unique: true,

        lowercase: true,

        trim: true,
      },

      /*
        PASSWORD
      */

      password: {
        type: String,

        required: true,
      },

      /*
        OPTIONAL AVATAR
      */

      avatar: {
        type: String,

        default: "",
      },

      /*
        ACCOUNT STATUS
      */

      isActive: {
        type: Boolean,

        default: true,
      },
    },

    {
      timestamps: true,
    }
  );

/*
  USER MODEL
*/

const User =
  mongoose.model(
    "User",
    userSchema
  );

module.exports =
  User;