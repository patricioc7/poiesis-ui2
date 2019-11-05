import { userService } from '../services/userService';

class Auth {

    user = {
        isLoggedIn : false,
        name : "",
        token : "",
        userId : "",
    }

    constructor() {
        if(JSON.parse(localStorage.getItem("user"))){
            const loggedUserJson = JSON.parse(localStorage.getItem("user"));
            this.user.isLoggedIn = loggedUserJson.isLoggedIn;
            this.user.name = loggedUserJson.name;
            this.user.token = loggedUserJson.token;
            this.user.userId = loggedUserJson.userId;
        }
       }

    getCurrentUser = () => {
        return this.user
    }

    doSignInWithEmailAndPassword = (email, password) => {
       return userService.login(email, password).then((user) => {
           if(user.userName != null && user.jwt.length >45){
               this.user.isLoggedIn = true;
               this.user.name = user.userName;
               this.user.token = user.jwt;
               this.user.userId = user.userId;
               localStorage.setItem('user', JSON.stringify(this.user));
               console.log(this.user);
               return this.user;
           }else{
               console.log('fallo condicion');
               return null;
           }

        })
    }

    doCreateUserWithEmailAndPassword = (username, email, password) =>{
        return userService.register(username, email, password).then((result) => {
            console.log('//////////result',result);
            console.log('//////////result',result.body);
            if(result.body.length >45){
                return true;
            }else{
                return false;
            }

        });
    }


    isLoggedIn = () => {
        return this.user.isLoggedIn;
    }

    doSignOut = () => {
        console.log('Logged out!')
        localStorage.removeItem('user');
        const sessionEvent = new Event('sessionEvent');
        sessionEvent.value = null;
        sessionEvent.key = 'signOut';
        document.dispatchEvent(sessionEvent);
    }


}

export default Auth;
