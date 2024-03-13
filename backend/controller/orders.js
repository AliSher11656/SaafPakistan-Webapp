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

      // Check if items is an array before attempting to iterate over it
      const recyclables = Array.isArray(order.items)
        ? order.items.map((item) => ({
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
        orderDate: order.orderDate.toDate(), // Convert Firebase Timestamp to Date object
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
