const express = require('express');
const app = express();
const warehouseRoute = require('./routes/warehouseRoute');
const inventoryRoute = require('./routes/inventoryRoute');
const cors = require('cors');

app.use(express.json());
app.use(cors());

// Warehouse route
app.use('/warehouse', warehouseRoute);

// Inventory route
app.use('/inventory', inventoryRoute);

// Start server listener
const SERVER_PORT = 8080;
app.listen(SERVER_PORT, () => {
    console.log(`Started server listener on port ${SERVER_PORT}`);
})