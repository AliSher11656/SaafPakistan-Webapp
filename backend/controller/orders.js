const admin = require("firebase-admin");
const firestore = admin.firestore();

module.exports.getOrders = async (req, res, next) => {
  try {
    const orderCollectionRef = firestore.collection("orders");
    const querySnapshot = await orderCollectionRef.get();

    const ordersData = [];

    querySnapshot.forEach((docSnap) => {
      const order = docSnap.data();
      const orderId = docSnap.id;

      const recyclables = Array.isArray(order.recyclables)
        ? order.recyclables.map((item) => ({
            item: item.item,
            price: item.price,
            quantity: item.quantity,
          }))
        : [];

      const orderObject = {
        orderId: orderId,
        address: order.address,
        area: order.area,
        customer: order.customer,
        orderDate: order.orderDate.toDate(),
        phoneNumber: order.phoneNumber,
        recyclables: recyclables,
        status: order.status,
        totalPrice: order.totalPrice,
        totalWeight: order.totalWeight,
      };

      ordersData.push(orderObject);
    });

    res.status(200).json(ordersData);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.getUserOrders = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Your existing code
    const orderCollectionRef = firestore.collection("orders");
    const querySnapshot = await orderCollectionRef
      .where("customer", "==", userId)
      .get();

    const ordersData = [];

    querySnapshot.forEach((docSnap) => {
      const order = docSnap.data();
      const orderId = docSnap.id;

      const recyclables = Array.isArray(order.recyclables)
        ? order.recyclables.map((item) => ({
            item: item.item,
            price: item.price,
            quantity: item.quantity,
          }))
        : [];

      const orderObject = {
        id: orderId,
        orderid: order.orderid,
        address: order.address,
        area: order.area,
        customer: order.customer,
        orderDate: order.orderDate.toDate(),
        phoneNumber: order.phoneNumber,
        recyclables: recyclables,
        status: order.status,
        totalPrice: order.totalPrice,
        totalWeight: order.totalWeight,
      };

      ordersData.push(orderObject);
    });

    res.status(200).json(ordersData);
  } catch (error) {
    console.error("Error fetching orders: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.deleteId;

    await firestore.collection("orders").doc(orderId).delete();

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    console.error("Error deleting order: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
