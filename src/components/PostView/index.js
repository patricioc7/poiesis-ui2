import React, {useState , useEffect} from 'react';

import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import TurnedIn from "@material-ui/icons/TurnedIn";
import { postService } from '../services/postService';
import { withAuthorization} from "../Session";
import LinearProgress from "@material-ui/core/LinearProgress";
import Card from "../../MaterialKitComponets/Card/Card";
import CardHeader from "../../MaterialKitComponets/Card/CardHeader";
import CardBody from "../../MaterialKitComponets/Card/CardBody";
import CardFooter from "../../MaterialKitComponets/Card/CardFooter";
import Comments from "../Comments"
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
                        console.log(error)
                    }

                );
        }
        fetchData()
    }, [] );

    const classes = useStyles();
    const content = values.postData.content;
    const title = values.postData.title ? values.postData.title : "cargando";
    const userName = values.postData.userName ? values.postData.userName : "cargando";
    const userId = values.postData.userId ? values.postData.userId : "cargando";
    return(
        <div >
            <div className={classes.maincontainer}>
                {isLoading ? (
                    <LinearProgress />
                ) : (
                <GridContainer >
                    <GridItem xs={12} sm={12} md={12}>

                        <Card>
                            <CardHeader color="primary">
                                <div><TurnedIn/>{title}</div>
                            </CardHeader>
                            <CardBody>
                                <p className={classes.textCenter}>
                                    {content}
                                </p>
                            </CardBody>
                            <CardFooter>
                                <p>Posteado por: <a href={userId}>{userName}</a></p>
                            </CardFooter>

                        </Card>
                    </GridItem>
                    <Comments postId={props.match.params.postid}/>
                </GridContainer>
                    )}
            </div>
        </div>
    )
}


const condition = authUser => !!authUser;
export default withAuthorization(condition)(PostView);
