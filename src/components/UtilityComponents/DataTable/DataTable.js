import React, { Component } from 'react';
import Paper from '@material-ui/core/Paper';
import Zoom from '@material-ui/core/Zoom';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import "./DataTable.css";



class DataTable extends Component {
 render(){
   return (
    <Paper>
      <Zoom in={!!this.props.datalist.length}>
        <div>
          <Typography className="caps-header" variant="h6" component="h6">
              {this.props.title}
          </Typography>
          <Table stickyHeader aria-label="sticky table">
          <TableHead>
              <TableRow>
                {
                    (this.props.datalist.length ? Object.keys(this.props.datalist[0]) : []).map(column => (
                      <TableCell key={column}>
                        {column}
                      </TableCell>
                    ) )
                }
              </TableRow>
            </TableHead>
            <TableBody>
              {
                this.props.datalist.map(row => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {
                          Object.keys(row).map(column => (
                            <TableCell key={column}>
                              {row[column]}
                            </TableCell>
                          ) )
                      }
                    </TableRow>
                  );
                })
              }
            </TableBody>
          </Table>
        </div>
      </Zoom>
    </Paper>
   );
 }
}

export default DataTable;