const express = require("express");
const WarehouseManagers = require("../controller/warehouseManagers");
const firebaseAuth = require("../middleware/firebase-auth");

const router = express.Router();
router.get(
  "/warehouseManager",
  firebaseAuth,
  WarehouseManagers.getWarehouseManagers
);
router.delete(
  "/warehouseManager/:id",
  firebaseAuth,
  WarehouseManagers.deleteWarehouseManager
);

module.exports = router;
