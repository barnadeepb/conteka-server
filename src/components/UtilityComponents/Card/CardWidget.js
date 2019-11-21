import React, { Component } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Language from "@material-ui/icons/Language";
import Grid from "@material-ui/core/Grid";
import Card from "./Card.js";
import CardBody from "./CardBody.js";
import CardHeader from "./CardHeader.js";
import CardIcon from "./CardIcon.js";
import dashboardStyle from "./dashboardStyle.js"; 
var styles = {
    ...dashboardStyle,
    cardTitle: {
      marginTop: "0",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      fontSize: "16px"
    }
};

const useStyles = makeStyles(styles);

export default function CardWidget(props){
    const classes = useStyles();
    const {value, text} = props;
    return (
        <div>
            <Card>
                <CardHeader color="info" icon>
                <CardIcon color="info">
                    {value}
                </CardIcon>
                </CardHeader>
                <CardBody>
                <h4 className={classes.cardTitle}>{text}</h4>
                </CardBody>
            </Card>
        </div>
    );
}