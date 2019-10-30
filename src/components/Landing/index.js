import React from 'react';

import '../../assets/css/landing.css';
import styles from "../../assets/jss/material-kit-react/views/landingPage.js";
import { makeStyles } from "@material-ui/core/styles";
import GridContainer from "../../MaterialKitComponets/Grid/GridContainer";
import GridItem from "../../MaterialKitComponets/Grid/GridItem";
import Button from "@material-ui/core/Button";
const useStyles = makeStyles(styles);

const App = () => {
    const classes = useStyles();
    return(
        <div className={'animationcontainer'}>
            <div className={classes.container}>
                <GridContainer >
                    <GridItem xs={12} sm={12} md={6} className={classes.jumbotron}>
                        <h1 className={classes.title}>Poiesis Arte Joven - Es porque sos.</h1>
                        <h4>
                            Every landing page needs a small description after the big bold
                            title, that{"'"}s why we added this text here. Add here all the
                            information that can make you or your product create the first
                            impression.
                        </h4>
                        <br />
                        <Button
                            color="danger"
                            size="lg"
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <i className="fas fa-play" />
                            Watch video
                        </Button>
                    </GridItem>
                </GridContainer>
            </div>
        </div>
    )
}

export default App;
