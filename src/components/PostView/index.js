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
import { withAuthorization} from "../Session";
import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
    postData: {},
    isLoading: true,
    user: '',
    title: '',

};

const PostView = (props) => {

    const [values, setValues] = useState({...INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await postService.getPost(props.match.params.postid, props.auth.token)
                .then(post => {
                    setValues({ ...values, postData :   JSON.parse(post.body),});
                    setIsLoading(false);
                }).catch(error => {
                        throw error
                    }

                );
        }
        fetchData()
    }, [] );

    const classes = useStyles();
    const content = values.postData.content;
    const title = values.postData.title ? values.postData.title : "cargando";
    return(
        <div >
            <div className={classes.maincontainer}>
                {isLoading ? (
                    <LinearProgress />
                ) : (
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
                    )}
            </div>
        </div>
    )
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(PostView);
