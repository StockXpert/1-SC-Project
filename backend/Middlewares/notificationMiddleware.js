const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


function sendNotificationToUser(userId, notificationTitle, notificationBody) {
  const userToken = getUserTokenFromDatabase(userId);
  
  if (!userToken) {
    console.error('Token utilisateur introuvable');
    return;
  }
  const message = {
    notification: {
      title: notificationTitle,
      body: notificationBody
    },
    token: userToken
  };

  admin.messaging().send(message)
    .then((response) => {
      console.log('Notification envoyée avec succès :', response);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi de la notification :', error);
    });
}
module.exports=sendNotificationToUser


