import React, {useEffect, useState} from 'react';
import { withAuthorization } from '../Session';
import {postService} from "../services/postService";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import CustomTabs from "../../MaterialKitComponets/CustomTabs/CustomTabs";
import TurnedIn from "@material-ui/icons/TurnedIn";
import {makeStyles} from "@material-ui/core";
import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinearProgress from "@material-ui/core/LinearProgress";
const useStyles = makeStyles(styles);
const INITIAL_STATE = {
    postData: {},
    isLoading: true,
    user: '',
    title: '',
};

const HomePage = (props) => {

    const [values, setValues] = useState({...INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await postService.getRecentPosts(props.auth.token)
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

    let arr = [];
    Object.keys(values.postData).forEach(function(key) {
        arr.push(values.postData[key]);
    });
    const classes = useStyles();
    return(
        <div >

            <div className={classes.maincontainer}>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <div>
                        {arr.reverse().map(item =>
                            <GridContainer >
                                <GridItem xs={12} sm={12} md={12}>
                                    <CustomTabs
                                        headerColor="primary"
                                        tabs={[
                                            {
                                                tabName: item.title,
                                                tabIcon: TurnedIn,
                                                tabContent: (
                                                    <p className={classes.textCenter}>
                                                        {item.content}
                                                    </p>
                                                )
                                            },
                                        ]}
                                    /> </GridItem>
                            </GridContainer>
                        )}
                    </div>
               )}
            </div>
        </div>
    )
};



const condition = authUser => !!authUser;
export default withAuthorization(condition)(HomePage);
