const express =
  require("express");

const cors =
  require("cors");

const dotenv =
  require("dotenv");

const connectDB =
  require("./config/db");

/*
  ROUTES
*/

const authRoutes =
  require("./routes/authRoutes");

const reportRoutes =
  require("./routes/reportRoutes");

/*
  CONFIG
*/

dotenv.config();

/*
  DATABASE
*/

connectDB();

/*
  APP
*/

const app = express();

/*
  MIDDLEWARE
*/

app.use(cors({
  origin:
     "https://vuln-probe.vercel.app",
     credentials: true,
}));

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

/*
  TEST ROUTE
*/

app.get("/", (req, res) => {
  res.json({
    message:
      "VulnProbe Backend Running",
  });
});

/*
  AUTH ROUTES
*/

app.use(
  "/api/auth",

  authRoutes
);

/*
  REPORT ROUTES
*/

app.use(
  "/api/reports",

  reportRoutes
);

/*
  ERROR HANDLER
*/

app.use(
  (
    err,
    req,
    res,
    next
  ) => {
    console.log(err);

    res.status(500).json({
      message:
        "Internal Server Error",
    });
  }
);

/*
  PORT
*/

const PORT =
  process.env.PORT || 5000;

/*
  SERVER
*/

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});