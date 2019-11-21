import React, { Component } from 'react';
import { connect } from "react-redux";
import Typography from '@material-ui/core/Typography';
import StarsIcon from '@material-ui/icons/Stars';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import LabelIcon from '@material-ui/icons/Label';
import MailIcon from '@material-ui/icons/Mail';
import PersonPlaceholder from "../../../resources/person-placeholder-female.jpg";
import BubbleStack from "./BubbleStack/BubbleStack";
import Grid from '@material-ui/core/Grid';
import { ACTION_TYPES } from "../../../js/constants/action-types";
import { USER_ROLES } from "../../../js/constants/user-roles";
import { TAB_TYPES } from "../../../js/constants/tab-types";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import CircularProgressIndicator from '../../UtilityComponents/CircularProgressIndicator/CircularProgressIndicator';
import { createAction } from "../../../js/actions/index";

// import BubbleStack from "../BubbleStack/BubbleStack";

import './LeftNav.css';
import { display } from '@material-ui/system';

const mapStateToProps = state => {
    return { role: state.role };
};

function mapDispatchToProps(dispatch) {
    return {
      setRole: role => dispatch(createAction(ACTION_TYPES.SET_ROLE, role)),
      openTab: tabType => dispatch(createAction(ACTION_TYPES.OPEN_TAB, tabType))
    };
}

class LeftNav extends Component {
    constructor(props){
        super(props);

        this.getTreeItem.bind(this);

        let menuOptions = [];
        // Each type of tab should be a shown as a button on the menu
        Object.keys(TAB_TYPES).forEach( tabType => {
            menuOptions.push(this.checkChildrenAndSetMenuItem(tabType, TAB_TYPES[tabType]));
        } );
        
        this.state = {
            open: false,
            showRoleLoader: false,
            menuOptions: menuOptions,
            showChildNodes: {}
        };
        this.showChildNodes = {};
    }

    componentDidMount () {
        this.setState(state => {
            return {
                ...state,
                showChildNodes: this.showChildNodes
            }
        });
    }

    checkChildrenAndSetMenuItem = (keyName, keyBody) => {
        let hasChildren = typeof keyBody !== "string";
        return {
            "label": keyName,
            "payload": !hasChildren && keyBody,
            "links": (hasChildren && Object.keys(keyBody).map( subType => {
                return this.checkChildrenAndSetMenuItem(subType, keyBody[subType]);
            } )) || []
        }
    }

    getTreeItem(menuItem, nodeName) {
        this.showChildNodes[nodeName] = (this.showChildNodes[nodeName] !== undefined) ?this.showChildNodes[nodeName] : !menuItem.links.length;
        return (!menuItem.links.length && (
            <ListItem button key={nodeName} onClick={this.openTab.bind(this, ACTION_TYPES.OPEN_TAB, menuItem.payload)} className="menu-item">
                <ListItemIcon><LabelIcon className="side-menu-icon" /></ListItemIcon>
                <ListItemText primary={menuItem.label} />
            </ListItem>
        )) || (
            <ListItem button key={nodeName} onClick={this.toggleSubMenu.bind(this, nodeName)} className="menu-list">
                <div className="menu-list-header">
                    <ListItemIcon><LabelIcon className="side-menu-icon" /></ListItemIcon>
                    <ListItemText primary={menuItem.label} />
                </div>
                <List className={`vertical-box ${this.state.showChildNodes[nodeName] ? "" : "hide-item"}`}>
                    {menuItem.links.map((link, index) => this.getTreeItem( link, `${nodeName}--${index}`))}
                </List>
            </ListItem>
        );
    };
    
    toggleSubMenu = (nodeName) => {
        Object.keys( this.showChildNodes).forEach(prop => {
            this.showChildNodes[prop] = prop === nodeName ? !this.showChildNodes[prop] : this.showChildNodes[prop];
        })
        this.setState(state => {
            return {
                ...state,
                showChildNodes: this.showChildNodes
            }
        });
    }
    openTab = (actionType, payload, event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.openTab(payload);
        // this.props.navigationHandler(pageName);
      };
  
    toggleDrawer = (open) => event => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
        }
        this.setState(state => {
            return {
                open: open 
            }
        });
    };
    toggleRole = (event) => {
        event.stopPropagation();
        this.setState((state)=>{
            return {
                ...state,
                showRoleLoader: true
            }
        });
        // TODO: (User switching): This function needs to change
        setTimeout(() => {
            if(this.props.role === USER_ROLES.HIRING_MANAGER) {
                this.props.setRole(USER_ROLES.VENDOR_MANAGER);
            } else {
                this.props.setRole(USER_ROLES.HIRING_MANAGER);
            }
            this.setState((state)=>{
                return {
                    ...state,
                    showRoleLoader: false
                }
            });
        }, 2000);
    }

    render = () => {
        return (
            <div className="side-menu-container app-container">
                <div
                    className="side-menu no-scroll"
                    role="presentation"
                >
                    <div className="company-emblem">
                        <Grid container spacing={2} alignItems="center">
                            <Grid item container alignItems="flex-end" xs={1}></Grid>
                            <Grid item container alignItems="flex-end" xs={2}>
                                <StarsIcon className="side-menu-icon"/>
                            </Grid>
                            <Grid item container alignItems="flex-start" xs={9} className="">
                                <Typography variant="h6">
                                    Conteka Technologies
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                    <Divider />
                    <div className="user-details-container">
                        <Grid container spacing={0} alignItems="center">
                            <Grid item container alignItems="flex-end" xs={3}>
                                <Avatar alt="Remy Sharp" src={PersonPlaceholder} className="user-profile-icon"/>
                            </Grid>
                            <Grid item container alignItems="flex-start" xs={9} className="">
                                {   
                                    !this.state.showRoleLoader ?
                                    (
                                        <Typography variant="subtitle1">
                                            {
                                                this.props.role === USER_ROLES.HIRING_MANAGER ?
                                                    (<span>
                                                        John Doe - HM
                                                        <AutorenewIcon className="toggle-role-icon" onClick={this.toggleRole.bind(this)}/>
                                                    </span>)
                                                :
                                                    (<span>
                                                        John Doe - Vendor M
                                                        <AutorenewIcon className="toggle-role-icon" onClick={this.toggleRole.bind(this)}/>
                                                    </span>)
                                            }
                                        </Typography>
                                    ):
                                    (<CircularProgressIndicator/>)
                                } 
                            </Grid>
                        </Grid>
                    </div>
                    <Divider />
                    
                    <BubbleStack/>
                    <Divider />
                    <TreeView>
                        <List>
                            {/* {this.state.menuOptions.length} */}
                            {
                                this.state.menuOptions.map((menuItem, index) => this.getTreeItem( menuItem, `node${index}`))
                            }
                        </List>
                    </TreeView>
                    <Divider />
                    <Typography variant="h6" component="h6" className="team-role-heaedr">
                        Some more content here.
                    </Typography>
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LeftNav);
