const Firebase = require('firebase-admin');

const serviceAccount = require('../drive-vik-firebase-adminsdk-fbsvc-607ef83bb2.json')

const firebase = Firebase.initializeApp({
    credential:Firebase.credential.cert(serviceAccount),
    storageBucket: 'drive-vik.firebasestorage.app'
})

module.exports = Firebase;