import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
// import Typography from '@material-ui/core/Typography';
import './RequestEditor.css';

class RequestEditor extends Component {
  render(){
    return (
      <Paper className="table-container">
            <p>
                This is the viewer/ editorfor a single request -- be it an already created one or a new request.
            </p>
      </Paper>
    );
  }
}

export default RequestEditor;