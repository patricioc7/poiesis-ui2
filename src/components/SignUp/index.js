import React, {useEffect, useState} from 'react';

import { Link , withRouter } from 'react-router-dom';
import { withAuth } from '../Auth';
import { compose } from 'recompose';
import * as ROUTES from '../../constants/routes';
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import Card from "../../MaterialKitComponets/Card/Card";
import CardBody from "../../MaterialKitComponets/Card/CardBody";
import CustomInput from "../../MaterialKitComponets/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Email} from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import styles from "../../assets/jss/material-kit-react/views/loginPage.js";
import CardFooter from "../../MaterialKitComponets/Card/CardFooter";
import Icon from "@material-ui/core/Icon";
import {makeStyles} from "@material-ui/core";

const SignUpPage = () => (
        <SignUpForm />
);

const INITIAL_STATE = {
    name: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: '',
    cardAnimation: "cardHidden",
};


const useStyles = makeStyles(styles);

const SignUpFormBaseFunctional = (props) => {
    const [form, setValues] = useState({...INITIAL_STATE});

    //Fade In
    useEffect(() => {
        const timer = setTimeout(() => {
            setValues({...INITIAL_STATE, cardAnimation: ""});
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit = (event) => {
        const { name, email, passwordOne } = form;
        props.auth
            .doCreateUserWithEmailAndPassword(name, email, passwordOne)
            .then(result => {
                setValues({ ...INITIAL_STATE });
                console.log('result on page',result);
                if(result){
                    props.history.push({pathname : ROUTES.SIGN_IN, state: { message: 'Usuario Creado Correctamente!' }});
                }else{
                    console.log('entro en el else')
                    setValues({ ...form, error: 'Error intentando Loguearse, intente nuevamente' });
                }

            })
            .catch(error => {
                setValues({ ...form, error });
            });
        event.preventDefault();
    }

    const onChange = event => {
        setValues({ ...form, [event.target.name]: event.target.value });
    };

    const classes = useStyles();

    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={4}>

                    <Card className={classes[form.cardAnimation]}>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <CardBody>
                                <CustomInput
                                    labelText="Nombre de usuario..."
                                    id="username"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,

                                        type: "name",
                                        name: "name",
                                        value: form.name,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
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
                                        type: "passwordOne",
                                        name: "passwordOne",
                                        value: form.passwordOne,
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
                                <CustomInput
                                    labelText="Repetir contraseña"
                                    id="pass"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "passwordTwo",
                                        name: "passwordTwo",
                                        value: form.passwordTwo,
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
                                <Button color="primary" size="large"
                                        type="submit">
                                    Registrate!
                                </Button>
                                {form.error && <p>{form.error.message}</p>}
                            </CardFooter>
                        </form>
                    </Card>
                </GridItem>
            </GridContainer>
        </div>
    )
}

const SignUpForm = compose(
    withRouter,
    withAuth,
)(SignUpFormBaseFunctional);


export default SignUpPage;
export { SignUpForm };
