const express = require("express");
const Order = require("../controller/orders");
const firebaseAuth = require("../middleware/firebase-auth");

const router = express.Router();
router.get(
  // "/admin/dashboard",
  //  firebaseAuth,
  Order.getOrders
);

router.get(
  "/users/:id",
  //  firebaseAuth,
  Order.getUserOrders
);
// router.post("/orders", firebaseAuth, Order.createOrder);
router.delete("/users/:id/:deleteId", firebaseAuth, Order.deleteOrder);
// router.put("/orders/:id", firebaseAuth, Order.updateOrder);

module.exports = router;
