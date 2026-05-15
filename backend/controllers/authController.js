const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

/*
  GENERATE JWT
*/

const generateToken =
  (id) => {
    return jwt.sign(
      { id },

      process.env.JWT_SECRET,

      {
        expiresIn: "365d",
      }
    );
  };

/*
  PASSWORD VALIDATION
*/

const isStrongPassword =
  (password) => {
    return (
      /[A-Z]/.test(
        password
      ) &&
      /[0-9]/.test(
        password
      ) &&
      password.length >= 8
    );
  };

/*
  REGISTER USER
*/

const registerUser =
  async (req, res) => {
    try {
      /*
        BODY
      */

      const {
        name,
        username,
        password,
      } = req.body;

      /*
        VALIDATION
      */

      if (
        !name?.trim() ||
        !username?.trim() ||
        !password?.trim()
      ) {
        return res
          .status(400)
          .json({
            message:
              "All fields are required",
          });
      }

      /*
        PASSWORD RULE
      */

      if (
        !isStrongPassword(
          password
        )
      ) {
        return res
          .status(400)
          .json({
            message:
              "Password must contain minimum 8 characters, one uppercase letter and one number",
          });
      }

      /*
        BUILD DOMAIN ID
      */

      const email =
        username
          .toLowerCase()
          .includes(
            "@vulnprobe.io"
          )
          ? username
              .toLowerCase()
              .trim()
          : `${username
              .toLowerCase()
              .trim()}@vulnprobe.io`;

      /*
        CHECK USER
      */

      const userExists =
        await User.findOne({
          email,
        });

      if (userExists) {
        return res
          .status(400)
          .json({
            message:
              "Domain ID already exists",
          });
      }

      /*
        HASH PASSWORD
      */

      const salt =
        await bcrypt.genSalt(
          10
        );

      const hashedPassword =
        await bcrypt.hash(
          password,
          salt
        );

      /*
        CREATE USER
      */

      const user =
        await User.create({
          name:
            name.trim(),

          email,

          password:
            hashedPassword,
        });

      /*
        RESPONSE
      */

      return res
        .status(201)
        .json({
          _id: user._id,

          name: user.name,

          email:
            user.email,

          token:
            generateToken(
              user._id
            ),
        });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

/*
  LOGIN USER
*/

const loginUser =
  async (req, res) => {
    try {
      /*
        BODY
      */

      const {
        username,
        password,
      } = req.body;

      /*
        VALIDATION
      */

      if (
        !username?.trim() ||
        !password?.trim()
      ) {
        return res
          .status(400)
          .json({
            message:
              "Domain ID and password required",
          });
      }

      /*
        FULL DOMAIN ID
      */

      const email =
        username
          .toLowerCase()
          .includes(
            "@vulnprobe.io"
          )
          ? username
              .toLowerCase()
              .trim()
          : `${username
              .toLowerCase()
              .trim()}@vulnprobe.io`;

      /*
        FIND USER
      */

      const user =
        await User.findOne({
          email,
        });

      /*
        INVALID USER
      */

      if (!user) {
        return res
          .status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

      /*
        CHECK PASSWORD
      */

      const isMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!isMatch) {
        return res
          .status(401)
          .json({
            message:
              "Invalid credentials",
          });
      }

      /*
        RESPONSE
      */

      return res.json({
        _id: user._id,

        name: user.name,

        email:
          user.email,

        token:
          generateToken(
            user._id
          ),
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

/*
  GET PROFILE
*/

const getUserProfile =
  async (req, res) => {
    try {
      return res.json({
        message:
          "Protected profile access granted",

        user:
          req.user,
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

/*
  DELETE ACCOUNT
*/

const deleteAccount =
  async (req, res) => {
    try {
      /*
        DELETE USER
      */

      await User.findByIdAndDelete(
        req.user._id
      );

      /*
        RESPONSE
      */

      return res.json({
        message:
          "Account deleted successfully",
      });
    } catch (error) {
      console.log(error);

      return res
        .status(500)
        .json({
          message:
            "Server Error",
        });
    }
  };

module.exports = {
  registerUser,

  loginUser,

  getUserProfile,

  deleteAccount,
};