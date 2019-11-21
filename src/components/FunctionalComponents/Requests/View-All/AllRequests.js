import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import './AllRequests.css';

class AllRequests extends Component {
  render(){
    return (
      <Paper className="table-container">
            <p>
                This is request list viewer.
                There would be a set of records below and a dropdown to filter them here.
            </p>
      </Paper>
    );
  }
}

export default AllRequests;