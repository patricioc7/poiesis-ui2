import React, { useEffect } from 'react';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import Navigation from '../Navigation';
import LandingPage from '../Landing';
import SignUpPage from '../SignUp';
import SignInPage from '../SignIn';
import Footer from "../../MaterialKitComponets/Footer/Footer.js";
import HomePage from '../Home';
import AdminPage from '../Admin';
import * as ROUTES from '../../constants/routes';
import { withAuthentication } from '../Session';
import PostView from "../PostView";
import '../../assets/css/main.css';
import NewPost from "../NewPost";


const App = (props) => {

    useEffect(() => {
        console.log('Estrellitas y boludeces');
        console.log(props);
        console.log(props.auth.isLoggedIn());
    });

    return (
        <Router>
            <div>
                <Navigation user={props.auth.user.name}/>
                <div className={'maindiv'}>
                    <hr />
                    <Route exact path={ROUTES.LANDING} component={LandingPage} />
                    <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
                    <Route path={ROUTES.SIGN_IN} component={SignInPage} />
                    <Route path={ROUTES.HOME} component={HomePage} />
                    <Route path={ROUTES.ADMIN} component={AdminPage} />

                    <Route path={ROUTES.POSTVIEW} component={PostView} />
                    <Route path={ROUTES.NEWPOST} component={NewPost} />

                    </div>
                <Footer/>
                </div>

        </Router>
    );
}


export default withAuthentication(App);
