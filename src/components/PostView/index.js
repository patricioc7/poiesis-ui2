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
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
    postData: {},
    isLoading: true,
    user: '',
    title: '',

};

const PostView  = (props) => (

    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <PostViewWithAuth  {...props}/> : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);


const PostViewWithAuth = (props) => {

    const [values, setValues] = useState({...INITIAL_STATE});

    useEffect(async () => {
        console.log('props en postview', props);
        const result = await postService.getPost(props.match.params.postid,'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjcmVhdGVkQXQiOjE1NzIzNzA1MDgsInVzZXJJZCI6IjVkNmZiY2QzZTE4ZDk4M2U4YjkyYjBlMiJ9.oXhC2OPM5DB3Sgz6fJnhFJnn76vDYT6EYQCyUHjEuJQ')
        console.log('resulto:',result)
        setValues({ ...values, postData :  JSON.parse(result.body),});
    }, [] );

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
                                    tabName: title,
                                    tabIcon: TurnedIn,
                                    tabContent: (
                                        <p className={classes.textCenter}>
                                           {content}
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

export default PostView;
