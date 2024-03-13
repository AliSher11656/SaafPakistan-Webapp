const express = require("express");
const Order = require("../controller/orders");
const firebaseAuth = require("../middleware/firebase-auth");

const router = express.Router();
router.get(
  // "/admin/dashboard",
  //  firebaseAuth,
  Order.getOrders
);
// router.post("/orders", firebaseAuth, Order.createOrder);
// router.delete("/orders/:id", firebaseAuth, Order.deleteOrder);
// router.put("/orders/:id", firebaseAuth, Order.updateOrder);

module.exports = router;
