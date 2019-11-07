import React from 'react';

import AuthUserContext from './context';
import { withAuth } from '../Auth';

const withAuthentication = Component => {
    class WithAuthentication extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                authUser:  JSON.parse(localStorage.getItem('user'))
            };
        }
        componentDidMount = () => {
            console.log('se montó');

            const onSessionEvent = (sessionEvent) => {
                if(sessionEvent.key == "signIn"){
                    console.log("+++++++++++")
                    console.log(sessionEvent.key);
                    console.log(sessionEvent.value);
                    console.log("+++++++++++")
                    if(sessionEvent.value){
                        console.log('cambio el estado a logged en withauthentication');
                        this.setState({authUser : this.props.auth.user})
                    }
                }else{
                    console.log('cambio el estado a logged OUT en withauthentication');
                    this.setState({authUser : null})
                }
            }

            this.listener = document.addEventListener("sessionEvent", onSessionEvent, false);

        }
        componentWillUnmount() {
            console.log('entró al unmount');
        }
        render() {
            return (
                <AuthUserContext.Provider value={this.state.authUser}>
                    <Component {...this.props} />
                </AuthUserContext.Provider>
            );
        }
    }
    return withAuth(WithAuthentication);
};
export default withAuthentication;
