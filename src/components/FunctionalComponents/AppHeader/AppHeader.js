import React, { Component } from 'react';
import clsx from 'clsx';
import { connect } from "react-redux";
// import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import './AppHeader.css';
import { getData } from "../../../js/mocks/GetData";
import CardWidget from '../../UtilityComponents/Card/CardWidget.js';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';
import { ACTION_TYPES } from "../../../js/constants/action-types";
import { createAction } from "../../../js/actions/index";
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Comment from '@material-ui/icons/Comment';
import MailIcon from '@material-ui/icons/Mail';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

const drawerWidth = 240;

const mapStateToProps = state => {
    return { 
        role: state.role, 
        appHeaderWidgets: state.appHeaderWidgets,
        todolistOpen: state.todolistOpen
    };
};

const useStyles = theme =>({
   appBar: {
        width: "100%",
        marginRight: "0px"
    },
   appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginRight: drawerWidth,
    },
    hide: {
        display: 'none',
      },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

class AppHeader extends Component {
    constructor(props) {
        super(props);
        let allData = {
            projects: getData('projects') || [],
            candidates: getData('candidates') || [],
            requests: getData('requests') || []
        };
        this.state = {
            requests: {
                new: allData.requests.filter(request => {
                    return request.status === "new";
                }),
                open: allData.requests.filter(request => {
                    return request.status === "active";
                })
            },
            resources: {
                staffed: allData.candidates.filter(request => {
                    return request.status === "staffed";
                }),
                available: allData.candidates.filter(request => {
                    return request.status === "available";
                })
            },
            tabValue: -1,
        };
    }

    clickHandler(...args) {
        this.props.onClick(...args);
    }
    setTab(tabIndex) {
        this.setState(state => {
            return {
                ...state,
                tabValue: tabIndex
            }
        })
    }
    handleNavigation = (pageName) => {
        this.props.navigationHandler(pageName);
    };

    render() {
        const { classes } = this.props;
        console.log(this.props);
        const handleDrawerClose = () => {
            this.props.dispatch(createAction(ACTION_TYPES.TOGGLETODO));
          };
        return (
            <div>
                <AppBar position="static">
                    <Toolbar className="welcomeHeaderToolbar top-bar">
                        Welcome {this.props.role}
                    </Toolbar>
                    <Toolbar className="welcomeHeaderToolbar">
                            <Grid className={clsx(classes.appBar, {
                                [classes.appBarShift]: this.props.todolistOpen,
                        })} container spacing={1}>
                                {this.props.appHeaderWidgets.map(obj=>{
                                    return (
                                        <Grid key={obj.key} item sm={2} >
                                            <CardWidget value={obj.value} text={obj.text}></CardWidget>
                                        </Grid>
                                    );
                                })}
                            </Grid>
                            <Drawer className={classes.drawer}
                            variant="persistent"
                            anchor="right"
                            open={this.props.todolistOpen}
                            classes={{
                                paper: classes.drawerPaper,
                            }}>
                            <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {this.props.open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className="list-component">
                                {[0, 1, 2, 3, 4, 5, 6].map(value => {
                                    const labelId = `checkbox-list-label-${value}`;

                                    return (
                                    <ListItem key={value} role={undefined} dense button>
                                        <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                        />
                                        </ListItemIcon>
                                        <ListItemText id={labelId} className="list-text" primary={`Line item ${value + 1}`} />
                                        <ListItemSecondaryAction>
                                        <IconButton edge="end" aria-label="comments">
                                            <Comment/>
                                        </IconButton>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                    );
                                })}
                            </List>
                            </Drawer>
                    </Toolbar>
                </AppBar>
            </div>
        );
    };
}

export default withStyles(useStyles)(
    connect(mapStateToProps)(AppHeader)
);