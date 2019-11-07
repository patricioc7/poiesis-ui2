import React, {useState , useEffect} from 'react';

import styles from "../../assets/jss/material-kit-react/views/componentsSections/tabsStyle.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import { withAuthorization} from "../Session";
import * as ROUTES from "../../constants/routes";
import SnackbarContent from "../../MaterialKitComponets/Snackbar/SnackbarContent";
import Card from "../../MaterialKitComponets/Card/Card";
import CardBody from "../../MaterialKitComponets/Card/CardBody";
import CustomInput from "../../MaterialKitComponets/CustomInput/CustomInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import CardFooter from "../../MaterialKitComponets/Card/CardFooter";
import Button from "@material-ui/core/Button";
import {commentService} from "../services/commentService";
import LinearProgress from "@material-ui/core/LinearProgress";
import Link from "@material-ui/core/Link";
const useStyles = makeStyles(styles);

const INITIAL_STATE = {
    postData: {},
    isLoading: true,
    content:'',
    error:'',

};

const COMMENTS_DATA = {
    postData: {},
    isLoading: true,
    user: '',
    title: '',
};


const Comments = (props) => {

    const [form, setValues] = useState({...INITIAL_STATE});
    const [comments, setComments] = useState({...COMMENTS_DATA});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const result = await commentService.getCommentByPost(props.auth.token, props.postId )
                .then(post => {
                    setComments({ ...comments, postData :   JSON.parse(post.body),});
                    setIsLoading(false);
                }).catch(error => {
                        throw error
                    }

                );
        }
        fetchData()
    }, [] );

    const userId = props.auth.userId;
    const userName = props.auth.name;
    const postId = props.postId;

    const onSubmit = event => {
        const { content } = form;
        commentService.newComment
        ( props.auth.token, postId, userId, content, userName)
            .then((user) => {
                if(user != null){
                    setValues({ ...INITIAL_STATE });
                    console.log('Redireccionando a la home');
                    props.history.push(ROUTES.HOME);
                }else{
                    const error = {message : 'Error intentando comentar, intente nuevamente'}
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

    const { content, error } = form;
    const classes = useStyles();

    let arr = [];
    Object.keys(comments.postData).forEach(function(key) {
        arr.push(comments.postData[key]);
    });

    return(
        <div className={classes.container}>
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
                    <div>
                        {isLoading ? (
                            <LinearProgress />
                        ) : (
                            <div>
                                {arr.reverse().map(item =>
                                    <GridContainer >
                                        <GridItem xs={12} sm={12} md={12}>
                                            <Card>
                                                <CardBody>
                                                    <p className={classes.textCenter}>
                                                        {item.content}
                                                    </p>
                                                </CardBody>
                                                <CardFooter>
                                                    <p>Posteado por: <Link href={item.userId}>{item.userName}</Link></p>
                                                </CardFooter>
                                            </Card>
                                        </GridItem>
                                    </GridContainer>
                                )}
                            </div>
                        )}
                    </div>
                </GridItem>
                <GridItem xs={12} sm={12} md={12}>
                    <Card className={classes[form.cardAnimation]}>
                        <form className={classes.form} onSubmit={onSubmit}>
                            <CardBody>
                                <CustomInput
                                    labelText="Comentario"
                                    id="content"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        onChange: onChange,
                                        type: "content",
                                        multiline : true,
                                        rows : "4",
                                        name: "content",
                                        value: form.content,
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
                                        <Button color="primary" size="large"
                                                type="submit">
                                            Comentar
                                        </Button>
                                    </GridItem>
                                </GridContainer>
                            </CardFooter>
                        </form>
                    </Card>

                </GridItem>

        </div>
    )
}

const condition = authUser => !!authUser;
export default withAuthorization(condition)(Comments);

