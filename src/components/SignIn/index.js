import React, {useState , useEffect} from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import { SignUpLink } from '../SignUp';
import { withAuth } from '../Auth';
import { PasswordForgetLink } from '../PasswordForget';
import * as ROUTES from '../../constants/routes';
import CardBody from "../../MaterialKitComponets/Card/CardBody";
import CustomInput from "../../MaterialKitComponets/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Email} from "@material-ui/icons";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import Card from "../../MaterialKitComponets/Card/Card.js";

const SignInPage = () => (
    <div>
        <h1>SignIn</h1>
        <SignInForm />
        <PasswordForgetLink />
        <SignUpLink />
    </div>
);
const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
    cardAnimation: "cardHidden",

};

import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import CardFooter from "../../MaterialKitComponets/Card/CardFooter";
import Icon from "@material-ui/core/Icon";


const useStyles = makeStyles(styles);

const SignInFromBaseFunctional = (props) => {
    const [form, setValues] = useState({...INITIAL_STATE});

    //Fade In
    useEffect(() => {
        const timer = setTimeout(() => {
            setValues({...INITIAL_STATE, cardAnimation: ""});
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit = event => {
        const { email, password } = form;
        props.auth.doSignInWithEmailAndPassword
        (email, password)
            .then(() => {
                setValues({ ...INITIAL_STATE });
                console.log('Redireccionando a la home');
                props.history.push(ROUTES.HOME);
            })
            .catch(error => {
                setValues({ error });
            });
        event.preventDefault();
    };

    const onChange = event => {
        console.log(event.target.name)
        console.log(event.target.value)

        setValues({ ...form, [event.target.name]: event.target.value });
    };

    const { email, password, error } = form;
    const isInvalid = password === '' || email === '';
    const classes = useStyles();

    return(
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>
                    <Card className={classes[form.cardAnimation]}>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <CardBody>
                                <CustomInput
                                    labelText="Email..."
                                    id="email"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "email",
                                        name: "email",
                                        value: form.email,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    labelText="Contraseña"
                                    id="pass"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "password",
                                        name: "password",
                                        value: form.password,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className={classes.inputIconsColor}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        ),
                                        autoComplete: "off"
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.cardFooter}>
                                <Button color="primary" size="large" disabled={isInvalid}
                                        type="submit">
                                    Continuar
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )

}
const SignInForm = compose(
    withRouter,
    withAuth,
)(SignInFromBaseFunctional);
export default SignInPage;
export { SignInForm };
