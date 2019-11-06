import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
       componentDidMount() {

           const onSessionEvent = (sessionEvent) => {
               if(sessionEvent.key == "signOut"){
                       this.props.history.push(ROUTES.SIGN_IN);
               }
           }

           this.listener = document.addEventListener("sessionEvent", onSessionEvent, false);

    }
 
        render() {
            return(
                <AuthUserContext.Consumer>
                    {auth =>
                        condition(auth) ? <Component {...this.props} auth={auth}/> : null
                    }
                </AuthUserContext.Consumer>
            )
        }
    }
    return compose(
        withRouter
    )(WithAuthorization);
};
export default withAuthorization;
