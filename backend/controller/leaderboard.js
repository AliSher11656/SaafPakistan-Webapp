const admin = require("firebase-admin");
const firestore = admin.firestore();

module.exports.getLeaderboard = async (req, res, next) => {
  try {
    let collectionName = "leaderboards";

    const type = req.query.type || "leaderboards";

    if (type === "organization") {
      collectionName = "organizationLeaderboard";
    }

    const leaderboardCollectionRef = firestore.collection(collectionName);

    const querySnapshot = await leaderboardCollectionRef
      .orderBy("points", "desc")
      .get();

    let rank = 1;
    const leaderboardData = [];
    querySnapshot.forEach((docSnap) => {
      const leaderboard = docSnap.data();
      const leaderboardId = docSnap.id;

      const leaderboardObject = {
        id: leaderboardId,
        uid: leaderboard.uid,
        cus: leaderboard.cus,
        points: leaderboard.points,
        rank: rank++,
      };

      leaderboardData.push(leaderboardObject);
    });

    res.status(200).json(leaderboardData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
