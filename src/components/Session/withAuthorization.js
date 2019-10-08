import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import AuthUserContext from './context';
import * as ROUTES from '../../constants/routes';

const withAuthorization = condition => Component => {
    class WithAuthorization extends React.Component {
       componentDidMount() {

           const onStorageEvent = (storageEvent) => {
               console.log('entró al authorized')
               if(storageEvent.key == "user"){
                   if(!storageEvent.value){
                       this.props.history.push(ROUTES.SIGN_IN);
                   }
               }
           }

           this.listener = document.addEventListener("storageChange", onStorageEvent, false);

    }
    componentWillUnmount() {
        this.listener;
    }
        render() {
            return(
                <AuthUserContext.Consumer>
                    {sorete =>
                        condition(sorete) ? <Component {...this.props} /> : null
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
