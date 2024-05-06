const admin = require("firebase-admin");

const firestore = admin.firestore();
exports.getCompletedOrders = async (req, res) => {
  try {
    const ordersRef = firestore.collection("orders");
    const querySnapshot = await ordersRef.where("status", "==", 2).get();

    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      // Add the document ID to the order object
      orders.push({ orderDocid: doc.id, ...order });
    });

    // Get user details for each order
    const ordersWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        const userRef = firestore.collection("appUsers").doc(order.customer);
        const userSnapshot = await userRef.get();
        const userDetails = userSnapshot.data();

        // Check if order has paymentStatus field, if yes use its value, otherwise set it to "unPaid"
        const paymentStatus = order.paymentStatus
          ? order.paymentStatus
          : "unPaid";

        return { ...order, userDetails, paymentStatus };
      })
    );

    return res.status(200).json({ ordersWithUserDetails });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
