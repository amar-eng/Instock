const express = require("express");
const app = express();
const warehouseRoute = require("./routes/warehouseRoute");
const inventoryRoute = require("./routes/inventoryRoute");
const cors = require("cors");
const path = require("path/posix");

app.use(express.json());
app.use(cors());

// Warehouse route
app.use("/warehouse", warehouseRoute);

// Inventory route
app.use("/inventory", inventoryRoute);

if (process.env.NODE_ENV === "production") {
  // Serve ny static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React App
  app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

// Start server listener
const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
  console.log(`Started server listener on port ${SERVER_PORT}`);
});
