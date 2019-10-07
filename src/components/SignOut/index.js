import React from 'react';
import { withAuth } from '../Auth';
const SignOutButton = ({ auth }) => (
    <button type="button" onClick={auth.doSignOut}>
        Sign Out
    </button>
);
export default withAuth(SignOutButton);
