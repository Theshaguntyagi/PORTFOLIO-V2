const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.sendNotificationToAll = functions.https.onRequest(
  async (req, res) => {
    try {
      const snapshot = await admin
        .firestore()
        .collection("notificationSubscribers")
        .get();

      if (snapshot.empty) {
        return res.status(200).json({ message: "No subscribers found" });
      }

      const tokens = snapshot.docs.map(doc => doc.data().token);

      const message = {
        notification: {
          title: "🔥 New Update from Vansh Tyagi",
          body: "New blog / update is live. Check it now 🚀",
        },
        tokens,
      };

      const response = await admin.messaging().sendMulticast(message);

      res.status(200).json({
        success: true,
        sent: response.successCount,
        failed: response.failureCount,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
);
