const express =
  require("express");

const router =
  express.Router();

const {
  registerUser,

  loginUser,

  getUserProfile,

  deleteAccount,
} = require(
  "../controllers/authController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/*
  REGISTER ROUTE
*/

router.post(
  "/register",

  registerUser
);

/*
  LOGIN ROUTE
*/

router.post(
  "/login",

  loginUser
);

/*
  PROFILE ROUTE
*/

router.get(
  "/profile",

  protect,

  getUserProfile
);

/*
  DELETE ACCOUNT
*/



router.delete(
  "/delete",

  protect,

  deleteAccount
);

module.exports =
  router;