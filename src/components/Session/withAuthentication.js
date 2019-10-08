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

            const onStorageEvent = (storageEvent) => {
                if(storageEvent.key == "user"){
                    console.log("+++++++++++")
                    console.log(storageEvent.key);
                    console.log(storageEvent.value);
                    console.log("+++++++++++")
                    if(!storageEvent.value){
                        console.log('cambio el estado a logged OUT en withauthentication');
                        this.setState({authUser : null})
                    }else{
                        console.log('cambio el estado a logged en withauthentication');
                        this.setState({authUser : this.props.auth.user})
                    }
                }
            }

            this.listener = document.addEventListener("storageChange", onStorageEvent, false);

        }
        componentWillUnmount() {
            console.log('entró al unmount');
            this.listener;
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
