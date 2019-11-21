import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import './AllVendors.css';

class AllVendors extends Component {
  render(){
    return (
      <Paper className="table-container">
            <p>
                This is vendor list viewer.
                There would be a set of records below and a dropdown to filter them here.
            </p>
      </Paper>
    );
  }
}

export default AllVendors;