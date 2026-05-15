const express =
  require("express");

const router =
  express.Router();

const {
  runScan,

  getReports,
} = require(
  "../controllers/reportController"
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

/*
  GET REPORTS
*/

router.get(
  "/",

  protect,

  getReports
);

module.exports =
  router;