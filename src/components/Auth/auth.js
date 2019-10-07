import { userService } from '../services/userService';

class Auth {

    user = {
        isLoggedIn : false,
        name : "",
        token :"",
    }

    constructor() {
        if(JSON.parse(localStorage.getItem("user"))){
            const loggedUserJson = JSON.parse(localStorage.getItem("user"));
            this.user.isLoggedIn = loggedUserJson.isLoggedIn;
            this.user.name = loggedUserJson.name;
            this.user.token = loggedUserJson.token;
        }

        const originalSetItem = localStorage.setItem;
        const event = new Event('storageChange');

        localStorage.setItem = function(key, value) {

            event.value = value;
            event.key = key;

            document.dispatchEvent(event);

            originalSetItem.apply(this, arguments);
        };

        const originalRemoveItem = localStorage.removeItem;
        localStorage.removeItem = function(key) {

            event.key = key;
            document.dispatchEvent(event);
            originalRemoveItem.apply(this, arguments);
        };



    }

    getCurrentUser = () => {
        return this.user
    }

    doSignInWithEmailAndPassword = (email, password) =>
       this.user = userService.login(email, password);

    isLoggedIn = () => {
        return this.user.isLoggedIn;
    }

    doSignOut = () => {
        console.log('Logged out!')
        localStorage.removeItem('user');
    }


}

/*
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);
}*/
export default Auth;
