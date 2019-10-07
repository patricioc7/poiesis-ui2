import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Auth, {AuthContext} from "./components/Auth";

ReactDOM.render(
    <AuthContext.Provider value={new Auth()}>
        <App />
    </AuthContext.Provider>
    ,document.getElementById('root'));

// If you want your src to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
