const express = require("express");
const Rider = require("../controller/riders");
const firebaseAuth = require("../middleware/firebase-auth");

const router = express.Router();
router.get("/rider", firebaseAuth, Rider.getRiders);
router.delete("/rider/:id", firebaseAuth, Rider.deleteRider);

module.exports = router;
