import React, {useState , useEffect} from 'react';

import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import TurnedIn from "@material-ui/icons/TurnedIn";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";
import CustomTabs from "../../MaterialKitComponets/CustomTabs/CustomTabs";
import { postService } from '../services/postService';
import {AuthUserContext} from "../Session";
import * as ROUTES from "../../constants/routes";
import SnackbarContent from "../../MaterialKitComponets/Snackbar/SnackbarContent";
import Card from "../../MaterialKitComponets/Card/Card";
import CardBody from "../../MaterialKitComponets/Card/CardBody";
import CustomInput from "../../MaterialKitComponets/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Email} from "@material-ui/icons";
import Icon from "@material-ui/core/Icon";
import CardFooter from "../../MaterialKitComponets/Card/CardFooter";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
    postData: {},
    isLoading: true,
    content: '',
    title: '',

};

const NewPost  = (props) => (

    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NewPostWithAuth  {...props}/> : <PostViewNoAuth />
        }
    </AuthUserContext.Consumer>
);


const NewPostWithAuth = (props) => {

    const [form, setValues] = useState({...INITIAL_STATE});

    //Fade In
    useEffect(() => {
        const timer = setTimeout(() => {
            setValues({...INITIAL_STATE, cardAnimation: ""});
        }, 700);
        return () => clearTimeout(timer);
    }, []);

    const onSubmit = event => {
        const { title, content } = form;
        postService.newPost
        ('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkQXQiOjE1NzIzNzA1MDgsInVzZXJJZCI6IjVkNmZiY2QzZTE4ZDk4M2U4YjkyYjBlMiJ9.oXhC2OPM5DB3Sgz6fJnhFJnn76vDYT6EYQCyUHjEuJQ', title, content )
            .then((user) => {
                if(user != null){
                    setValues({ ...INITIAL_STATE });
                    console.log('Redireccionando a la home');
                    props.history.push(ROUTES.HOME);
                }else{
                    const error = {message : 'Error intentando loguearse, intente nuevamente'}
                    setValues({ ...INITIAL_STATE, cardAnimation: "", error: error });
                }

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
                {form.error &&
                <GridItem xs={12} sm={12} md={12}>
                    <SnackbarContent
                        message={
                            <span>
                            <b>{form.error.message}</b>
                          </span>
                        }
                        close
                        color="danger"
                        icon="info_outline"
                    />
                </GridItem>
                }
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes[form.cardAnimation]}>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <CardBody>
                                <CustomInput
                                    labelText="Título..."
                                    id="title"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "title",
                                        name: "title",
                                        value: form.title,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email className={classes.inputIconsColor} />
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    labelText="Contenido"
                                    id="content"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "content",
                                        multiline : true,
                                        rows : "8",
                                        name: "content",
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
                                <GridContainer >
                                    <GridItem xs={12} sm={12} md={12} lg={12}>
                                        <Button color="primary" size="large" disabled={isInvalid}
                                                type="submit">
                                            Postear
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </CardFooter>
                        </form>
                    </Card>

                </GridItem>
            </GridContainer>
        </div>
    )
}

const PostViewNoAuth = (props) => {



    const classes = useStyles();
    const content = values.postData.content;
    const title = values.postData.title;
    return(
        <div >
            <div className={classes.maincontainer}>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={12}>
                        <CustomTabs
                            headerColor="primary"
                            tabs={[
                                {
                                    tabName: 'naaaa',
                                    tabIcon: Face,
                                    tabContent: (
                                        <p className={classes.textCenter}>
                                           'Logueate papu'
                                        </p>
                                    )
                                },
                                {
                                    tabName: "Messages",
                                    tabIcon: Chat,
                                    tabContent: (
                                        <p className={classes.textCenter}>
                                            I think that’s a responsibility that I have, to push
                                            possibilities, to show people, this is the level that
                                            things could be at. I will be the leader of a company
                                            that ends up being worth billions of dollars, because I
                                            got the answers. I understand culture. I am the nucleus.
                                            I think that’s a responsibility that I have, to push
                                            possibilities, to show people, this is the level that
                                            things could be at.
                                        </p>
                                    )
                                },
                                {
                                    tabName: "Settings",
                                    tabIcon: Build,
                                    tabContent: (
                                        <p className={classes.textCenter}>
                                            think that’s a responsibility that I have, to push
                                            possibilities, to show people, this is the level that
                                            things could be at. So when you get something that has
                                            the name Kanye West on it, it’s supposed to be pushing
                                            the furthest possibilities. I will be the leader of a
                                            company that ends up being worth billions of dollars,
                                            because I got the answers. I understand culture. I am
                                            the nucleus.
                                        </p>
                                    )
                                }
                            ]}
                        />
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

export default NewPost;
