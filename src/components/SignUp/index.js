import React, { useState } from 'react';

import { Link , withRouter } from 'react-router-dom';
import { withAuth } from '../Auth';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
const SignUpPage = () => (
    <div>
        <h1>SignUp</h1>
        <SignUpForm />
    </div>
);

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
};

const SignUpFormBaseFunctional = () => {
    const [form, setValues] = useState({...INITIAL_STATE});

    const onSubmit = (event) => {
        const { username, email, passwordOne } = this.state;
        this.props.auth
            .doCreateUserWithEmailAndPassword(username, email, passwordOne)
            .then(authUser => {
                this.setState({ ...INITIAL_STATE });
                this.props.history.push(ROUTES.SIGN_IN);
            })
            .catch(error => {
                this.setState({ error });
            });
        event.preventDefault();
    }

    const onChange = event => {
        setValues({ ...form, [event.target.name]: event.target.value });
    };

    return (
        <form onSubmit={onSubmit}>
            <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
            />
            <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
            />
            <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
            />
            <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
            />
            <button disabled={isInvalid} type="submit">Sign Up</button>
            {error && <p>{error.message}</p>}
        </form>
    );

}


const SignUpForm = compose(
    withRouter,
    withAuth,
)(SignUpFormBaseFunctional);


const SignUpLink = () => (
    <p>
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
);
export default SignUpPage;
export { SignUpForm, SignUpLink };
