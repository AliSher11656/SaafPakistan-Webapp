const admin = require("firebase-admin");

const firestore = admin.firestore();
exports.getCompletedOrders = async (req, res) => {
  try {
    const type = req.query.type || "unPaid";

    const ordersRef = firestore.collection("orders");
    const querySnapshot = await ordersRef.where("status", "==", 2).get();

    const orders = [];
    querySnapshot.forEach((doc) => {
      const order = doc.data();
      orders.push({ orderDocid: doc.id, ...order });
    });

    // Get user details for each order
    const ordersWithUserDetails = await Promise.all(
      orders.map(async (order) => {
        const userRef = firestore.collection("appUsers").doc(order.customer);
        const userSnapshot = await userRef.get();
        const userDetails = userSnapshot.data();

        // Check if order has paymentStatus field and it matches the type
        if (
          (type === "Paid" && order.paymentStatus === "Paid") ||
          (type === "unPaid" &&
            (!order.paymentStatus || order.paymentStatus === "unPaid"))
        ) {
          return {
            ...order,
            userDetails,
            paymentStatus: order.paymentStatus || "unPaid",
          };
        }
        return null; // Return null for orders that don't match the type
      })
    );

    // Filter out null values
    const filteredOrders = ordersWithUserDetails.filter(
      (order) => order !== null
    );

    return res.status(200).json({ ordersWithUserDetails: filteredOrders });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
