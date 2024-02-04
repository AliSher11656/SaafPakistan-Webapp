const firestore = require("firebase-admin").firestore();

async function getUser(req, res) {
  const userId = req.params.id;
  if (!userId) {
    res.status(400).json({ error: { code: "no-user-id" } });
    return;
  }

  // if (userId !== req.token.uid) {
  //   res.status(403).json({ error: { code: "unauthorized" } });
  // }

  const snapshot = await firestore
    .collection("Areas")
    .doc("3lYnpbk095h6UjoAzS12")
    .get();
  if (!snapshot.exists) {
    res.status(404).json({ error: { code: "user-not-found" } });
    return;
  }
  const user = snapshot.data();
  console.log("user == ", user);

  res.status(200).json(user.location);
}

module.exports = getUser;
