const admin = require("firebase-admin");
const firestore = admin.firestore();

module.exports.getMobileUsers = async (req, res, next) => {
  try {
    const mobileUsersCollectionRef = firestore.collection("appUsers");
    const querySnapshot = await mobileUsersCollectionRef.get();

    const mobileUsersData = [];
    querySnapshot.forEach((docSnap) => {
      const mobileUser = docSnap.data();
      const mobileUserId = docSnap.id;

      const mobileUserObject = {
        id: mobileUserId,
        name: mobileUser.name,
        email: mobileUser.email,
        phone: mobileUser.phone,
        address: mobileUser.address,
        area: mobileUser.area,
        accountType: mobileUser.accountType,
      };

      mobileUsersData.push(mobileUserObject);
    });

    res.status(200).json(mobileUsersData);
  } catch (error) {
    console.error("Error fetching warehouse managers: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.deleteMobileUser = async (req, res, next) => {
  try {
    const id = req.params.id;

    await admin.auth().deleteUser(id);

    await firestore.collection("appUsers").doc(id).delete();

    res.status(200).send("Warehouse manager deleted successfully");
  } catch (error) {
    console.error("Error deleting warehouse manager: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
