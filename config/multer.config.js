const multer = require('multer');
const firebaseStorage = require('multer-firebase-storage');
const firebase = require('./firebase.config');
const serviceAccount = require('../drive-vik-firebase-adminsdk-fbsvc-607ef83bb2.json')

const storage = firebaseStorage({
    credentials: firebase.credential.cert(serviceAccount),
    bucketName: 'drive-vik.firebasestorage.app',
    unique:true,
})

const upload = multer({
    storage: storage,
})

module.exports = upload;