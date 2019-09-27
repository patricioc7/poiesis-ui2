import app from 'firebase/app';
import 'firebase/auth';

const config = {
    apiKey: 'AIzaSyBm5PB2uIPz400NDUwWT3g84R3KuP9D6dg',
    authDomain: 'poiesis-ui.firebaseapp.com',
    databaseURL: 'https://poiesis-ui.firebaseio.com',
    projectId: 'poiesis-ui',
    storageBucket: '',
    messagingSenderId: '263207201777',
    appId : '1:263207201777:web:9ffd72a55b1252e7f33250'
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
    }

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}
export default Firebase;
