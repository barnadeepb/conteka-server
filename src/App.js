import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import LeftNav from './components/FunctionalComponents/LeftNav/LeftNav';
import AppHeader from './components/FunctionalComponents/AppHeader/AppHeader';
import WorkArea from './components/FunctionalComponents/WorkArea/WorkArea';
import { connect } from "react-redux";
import { createAction } from "./js/actions/index";
import { ACTION_TYPES } from "./js/constants/action-types";
import { USER_ROLES } from "./js/constants/user-roles";
import './components/UtilityComponents/styles/customScrollbar.css';
import './App.css';

function mapDispatchToProps(dispatch) {
  return {
    setRole: role => dispatch(createAction(ACTION_TYPES.SET_ROLE, role))
  };
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {};
    // #TODO: This needs to change. The role should be set from somewhere else.
    this.props.setRole(USER_ROLES.HIRING_MANAGER);
  }

  render() {
    return (
      <div className="app-container">
        <Grid container spacing={0}>
            <Grid item xs={12} md={3} lg={2}>
              <LeftNav/>
            </Grid>
            <Grid item container spacing={0} xs={12} md={9} lg={10}>
              <div className="workspace-header">
                <AppHeader/>
              </div>
              <div className="app-container">
                <WorkArea/>
              </div>
            </Grid>
        </Grid>
      </div>
    );
  }
}

export default connect(null,mapDispatchToProps)(App);