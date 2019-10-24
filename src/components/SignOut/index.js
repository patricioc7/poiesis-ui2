import React from 'react';
import { withAuth } from '../Auth';
import Button from '@material-ui/core/Button';
const SignOutButton = ({ auth }) => (
    <Button type="button" onClick={auth.doSignOut}>
        Salir
    </Button>
);
export default withAuth(SignOutButton);
