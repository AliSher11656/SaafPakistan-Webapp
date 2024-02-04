const admin = require("firebase-admin");
const firestore = admin.firestore();

module.exports.getRiders = async (req, res, next) => {
  try {
    const riderCollectionRef = firestore.collection("rider");
    const querySnapshot = await riderCollectionRef.get();

    const ridersData = [];

    await Promise.all(
      querySnapshot.docs.map(async (docSnap) => {
        const rider = docSnap.data();
        const riderId = docSnap.id;

        const areaRef = rider.area;
        let area = null;

        if (areaRef) {
          const areaDoc = await firestore.doc(areaRef.path).get();
          area = areaDoc.data();
        }

        const riderObject = {
          id: riderId,
          name: rider.name,
          email: rider.email,
          idCard: rider.idCard,
          area: area ? area.location : "",
          phone: rider.phone,
          vehicleNumber: rider.vehicleNumber,
          address: rider.address,
        };

        ridersData.push(riderObject);
      })
    );

    res.status(200).json(ridersData);
  } catch (error) {
    console.error("Error fetching riders: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteRider = async (req, res, next) => {
  try {
    const id = req.params.id;

    await admin.auth().deleteUser(id);

    await firestore.collection("rider").doc(id).delete();

    res.status(200).send("Rider deleted successfully");
  } catch (error) {
    console.error("Error deleting rider: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
