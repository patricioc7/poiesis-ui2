import React, {useState , useEffect} from 'react';

import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import { withAuthorization} from "../Session";
import LinearProgress from "@material-ui/core/LinearProgress";
import classNames from "classnames";
import {Image, CloudinaryContext} from "cloudinary-react";
import Button from "@material-ui/core/Button";
import {userService} from "../services/userService";
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
    userData: {},
    isLoading: true,
    user: '',
    title: '',

};

const Profile = (props) => {

    const [values, setValues] = useState({...INITIAL_STATE});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await userService.getUser(props.match.params.userid, props.auth.token)
                .then(user => {
                    setValues({ ...values, userData : JSON.parse(user.body),});
                    setIsLoading(false);
                }).catch(error => {
                        console.log(error)
                    }

                );
        }
        fetchData()
    }, [] );

    const classes = useStyles();
    const description = values.userData.description;
    const pictureUrl = values.userData.pictureUrl ? values.userData.pictureUrl : "cargando";
    const userName = values.userData.name ? values.userData.name : "cargando";

    return(
        <div >
            <div className={classes.maincontainer}>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                    <div className={classNames(classes.main, classes.mainRaised)}>
                        <div>
                            <div className={classes.container}>
                                <GridContainer justify="center">
                                    <GridItem xs={12} sm={12} md={6}>
                                        <div className={classes.profile}>
                                            <div>
                                                <div className="profile-image">
                                                    <CloudinaryContext cloudName="dv5vzk5cl">
                                                        <Image publicId="profiles/patoco.jpg" >
                                                        </Image>
                                                    </CloudinaryContext>
                                                </div>
                                            </div>
                                            <div className={classes.name}>
                                                <h3 className={classes.title}>{userName}</h3>
                                                <h6>Escritor</h6>

                                            </div>
                                        </div>
                                    </GridItem>
                                </GridContainer>
                                <div className={classes.description}>
                                    <p>
                                        {description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(Profile);
