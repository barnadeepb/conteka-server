import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import DataTable from "../DataTable/DataTable";
import { getData } from "../../../js/mocks/GetData";
import './VATable.css';

class VATable extends Component {
  constructor(props) {
    super(props);
    this.state = {
        masterData: getData('all')
    };
    this.displayData = [];
  }
  render(){
    let datalist = [];
    if(this.props.type) {
      datalist = this.state.masterData[this.props.type].filter(item=> item.status===this.props.status)
    }
    this.displayData = datalist;

    return (
      <Paper className="table-container">
        <DataTable datalist={this.displayData} type={this.props.type} status={this.props.status}></DataTable>
      </Paper>
    );
  }
}

export default VATable;