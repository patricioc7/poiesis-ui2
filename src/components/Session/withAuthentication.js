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
        componentDidMount() {
            console.log('se montó');

            const onStorageEvent = (storageEvent) => {
                if(storageEvent.key == "user"){
                    if(storageEvent.value === undefined){
                        this.setState({authUser : null})
                    }else{
                        this.setState({authUser : JSON.parse(localStorage.getItem('user'))})
                    }
                }
            }

            this.listener = document.addEventListener("storageChange", onStorageEvent, false);

        }
        componentWillUnmount() {
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
