const express = require("express");
const app = express();
const warehouseRoute = require("./routes/warehouseRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const cors = require("cors");
const path = require("path/posix");

app.use(express.json());

// Middleware

const whitelist = [
  "http://localhost:3000",
  "http://localhost:8080",
  "https://shrouded-journey-38552.heroku...",
];
const corsOptions = {
  origin: function (origin, callback) {
    console.log("** Origin of request " + origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      console.log("Origin acceptable");
      callback(null, true);
    } else {
      console.log("Origin rejected");
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

// Warehouse route
app.use("/warehouse", warehouseRoute);

// Inventory route
app.use("/inventory", inventoryRoute);

const path = require("path");
if (process.env.NODE_ENV === "production") {
  // Serve ny static files
  app.use(express.static("client/build"));
  // Handle React routing, return all requests to React App
  app.get("*", function (req, res) {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start server listener
const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Started server listener on port ${SERVER_PORT}`);
});
