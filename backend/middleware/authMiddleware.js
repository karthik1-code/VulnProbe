const jwt =
  require("jsonwebtoken");

const User =
  require("../models/User");

/*
  PROTECT MIDDLEWARE
*/

const protect =
  async (
    req,
    res,
    next
  ) => {
    try {
      let token;

      /*
        CHECK AUTH HEADER
      */

      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith(
          "Bearer"
        )
      ) {
        /*
          GET TOKEN
        */

        token =
          req.headers.authorization.split(
            " "
          )[1];
      }

      /*
        TOKEN MISSING
      */

      if (!token) {
        return res
          .status(401)
          .json({
            message:
              "No token provided",
          });
      }

      /*
        VERIFY TOKEN
      */

      const decoded =
        jwt.verify(
          token,

          process.env.JWT_SECRET
        );

      /*
        GET USER
      */

      const user =
        await User.findById(
          decoded.id
        ).select(
          "-password"
        );

      /*
        USER NOT FOUND
      */

      if (!user) {
        return res
          .status(401)
          .json({
            message:
              "User not found",
          });
      }

      /*
        ATTACH USER
      */

      req.user = user;

      next();
    } catch (error) {
      console.log(error);

      return res
        .status(401)
        .json({
          message:
            "Not authorized",
        });
    }
  };

module.exports = {
  protect,
};