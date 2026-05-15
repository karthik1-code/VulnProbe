const express =
  require("express");

const router =
  express.Router();

const {
  runScan,
} = require(
  "../controllers/scannerController"
);

const {
  protect,
} = require(
  "../middleware/authMiddleware"
);

/*
  RUN SCAN
*/

router.post(
  "/scan",

  protect,

  runScan
);

module.exports =
  router;