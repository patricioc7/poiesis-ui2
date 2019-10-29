import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import * as ROUTES from '../../constants/routes';
import { AuthUserContext } from '../Session';
import Button from "../../MaterialKitComponets/CustomButtons/Button";
import Email from "@material-ui/core/SvgIcon/SvgIcon";
import CustomDropdown from "../../MaterialKitComponets/CustomDropdown/CustomDropdown";
import Header from "../../MaterialKitComponets/Header/Header";

import styles from "../../assets/jss/material-kit-react/views/componentsSections/navbarsStyle.js";
import SignOutButton from "../SignOut";
const useStyles = makeStyles(styles);


const Navigation = (props) => (

    <AuthUserContext.Consumer>
        {authUser =>
            authUser ? <NavigationAuth  {...props}/> : <NavigationNonAuth />
        }
    </AuthUserContext.Consumer>
);

const NavigationAuth = (props) => {
    const classes = useStyles();

    return(
        <Header
            color="primary"
            fixed
            brand = "Poiesis Arte Joven"
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
            leftLinks={
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Palabra
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Música
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Imágen
                        </Button>
                    </ListItem>
                </List>
            }
            rightLinks={
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <Button
                            justIcon
                            round
                            href={ROUTES.SIGN_IN}
                            className={classes.notificationNavLink}
                            color="blue"
                        >
                            <Email className={classes.icons} />
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <CustomDropdown
                            left
                            caret={false}
                            hoverColor="black"
                            dropdownHeader="Dropdown Header"
                            buttonText={
                                props.user
                            }
                            buttonProps={{
                                className:
                                    classes.navLink + " " + classes.imageDropdownButton,
                                color: "transparent"
                            }}
                            dropdownList={[
                                "Me",
                                "Settings and other stuff",
                                <SignOutButton />
                            ]}
                        />
                    </ListItem>
                </List>
            }
        />
    )
}

const NavigationNonAuth = () => {
    const classes = useStyles();
    return(
        <Header
            color="primary"
            fixed
            brand = "Poiesis Arte Joven"
            changeColorOnScroll={{
                height: 400,
                color: "white"
            }}
            leftLinks={
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Palabra
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Música
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            href="#pablo"
                            className={classes.navLink}
                            onClick={e => e.preventDefault()}
                            color="transparent"
                        >
                            Imágen
                        </Button>
                    </ListItem>
                </List>
            }
            rightLinks={
                <List className={classes.list}>
                    <ListItem className={classes.listItem}>
                        <Button
                            href={ROUTES.SIGN_IN}
                            className={classes.navLink}
                            color="transparent"
                        >
                            Logueate
                        </Button>
                    </ListItem>
                    <ListItem className={classes.listItem}>
                        <Button
                            href={ROUTES.SIGN_UP}
                            className={classes.navLink}
                            color="transparent"
                        >
                            Registrate
                        </Button>
                    </ListItem>
                </List>
            }
        />
    )

}



export default Navigation;
