import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';

const propTypes = {
  list: PropTypes.array,
  header: PropTypes.array,
  onDataSelection: PropTypes.func,
};

const defaultProps = {
  list: [],
  header: [],
  onDataSelection: () => { },
};

export default class List extends React.PureComponent {
  
  onRowClick = (row) => (e) => {
    this.props.onDataSelection(row);
  }
  
  render() {
    const { list, header } = this.props;
    return (
      
      <Paper className='mt-20'>
        <Table>
          <TableHead>
            <TableRow>
              {
                header.map(item => {
                  return <TableCell align="right" key={item}>{item}</TableCell>;
                })
              }
            </TableRow>
          </TableHead>
          <TableBody
          >
            {list.map(row => (
              <TableRow
                onClick={this.onRowClick(row)}
              >
                {
                  header.map(item => {
                    return (
                      <Tooltip title="Click to get Details">
                        <TableCell align="right">{row[item]}</TableCell>
                      </Tooltip>  
                    );
                  })
                }
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }

}

List.propTypes = propTypes;
List.defaultProps = defaultProps;
