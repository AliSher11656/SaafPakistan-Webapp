const admin = require("firebase-admin");
const firestore = admin.firestore();
// async function getUser(req, res) {
//   const userId = req.params.id;
//   if (!userId) {
//     res.status(400).json({ error: { code: "no-user-id" } });
//     return;
//   }

//   // if (userId !== req.token.uid) {
//   //   res.status(403).json({ error: { code: "unauthorized" } });
//   // }

//   const snapshot = await firestore
//     .collection("Areas")
//     .doc("3lYnpbk095h6UjoAzS12")
//     .get();
//   if (!snapshot.exists) {
//     res.status(404).json({ error: { code: "user-not-found" } });
//     return;
//   }
//   const user = snapshot.data();
//   console.log("user == ", user);

//   res.status(200).json(user.location);
// }

module.exports.getAreas = async (req, res, next) => {
  try {
    const areaCollectionRef = firestore.collection("Areas");
    const querySnapshot = await areaCollectionRef.get();

    const areasData = [];

    querySnapshot.docs.map(async (docSnap) => {
      const area = docSnap.data();
      const areaId = docSnap.id;

      const areaObject = {
        id: areaId,
        location: area.location,
      };

      areasData.push(areaObject);
    });

    res.status(200).json(areasData);
  } catch (error) {
    console.error("Error fetching areas: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
