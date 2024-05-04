require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const functions = require("firebase-functions");
const firebaseConfig = require("./firebase.config");
const { initializeApp } = require("firebase/app");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account-key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
initializeApp(firebaseConfig);

// const routesHandler = require("./routes/handler.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));

// const getUser = require("./routes/area");
// const WarehouseManagers = require("./routes/warehouseManagers");
// app.use("/", routesHandler);
const warehouseManagerRoutes = require("./routes/warehouseManagerRoutes");
const mobileUserRoutes = require("./routes/mobileUserRoutes");
const riderRoutes = require("./routes/riderRoutes");
const signupRoutes = require("./routes/signupRoutes");
const loginRoutes = require("./routes/loginRoutes");
const areaRoutes = require("./routes/areaRoutes");
const orderRoutes = require("./routes/orderRoutes");
const recyclableRoutes = require("./routes/recyclablesRoutes");
const statsRoutes = require("./routes/statsRoutes");
const tipsRoutes = require("./routes/tipsRoutes");
const leaderboardRoutes = require("./routes/leaderboardsRoutes");

const PORT = process.env.PORT || 4000; // backend routing port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

app.use("/", warehouseManagerRoutes);
app.use("/", mobileUserRoutes);
app.use("/", riderRoutes);
app.use("/", signupRoutes);
app.use("/", loginRoutes);
app.use("/", areaRoutes);
app.use("/", orderRoutes);
app.use("/", recyclableRoutes);
app.use("/", statsRoutes);
app.use("/", tipsRoutes);
app.use("/", leaderboardRoutes);

exports.api = functions.https.onRequest(app);
