import admin from 'firebase-admin';

const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT_JSON || '{}',
);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
}

const verifyFirebaseToken = async (idToken: string) => {
    try {
        return await admin.auth().verifyIdToken(idToken);
    } catch {
        return null;
    }
};

export default verifyFirebaseToken;
