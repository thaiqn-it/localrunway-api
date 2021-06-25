const firebaseAdmin = require("firebase-admin");
const path = require("path");
const CERT_PATH = path.join(
	__dirname,
	"..",
	"private",
	"localrunway-firebase-adminsdk-g4m0z-f61fed33d2.json"
);

firebaseAdmin.initializeApp({
	credential: firebaseAdmin.credential.cert(CERT_PATH),
	storageBucket: "localrunway.appspot.com",
});

const bucket = firebaseAdmin.storage().bucket();

module.exports = {
	firebaseBucket: bucket,
};
