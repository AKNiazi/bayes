import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const propTypes = {
  from: PropTypes.string,
  to: PropTypes.string,
  dateChanged: PropTypes.func,
};

const defaultProps = {
  from: '',
  to: '',
  dateChanged: () => { }
};

export default class DateFilter extends React.PureComponent {

  constructor(props) {
    super(props);
    const {to, from} = this.props;
    this.state = {
      to: to === '' ? new Date(): new Date(to),
      from: from === '' ? new Date(): new Date(from),
    };
  }

  handleDateChange = (type) => (value) => {
    this.setState({
      [type]: new Date(value),
    });
  }

  submitForm = () => {
    const { to, from } = this.state;
    this.props.dateChanged({ to, from });
  }

  clearForm = () => {
    this.setState({
      to: new Date(),
      from: new Date(),
    });
    this.props.dateChanged({ to: '', from: '' });
  }

  render() {
    const { to, from } = this.state;
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            label="From"
            value={from}
            onChange={ this.handleDateChange('from') }
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            label="To"
            value={to}
            minDate={from}
            onChange={ this.handleDateChange('to') }
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
          
        </Grid>
        <Grid container justify="center" className='mt-20'>
          <Grid item xs={2}>
            <Button variant="contained" color="primary" size="small" onClick={this.submitForm}>
              Apply Filter
            </Button>
          </Grid>
          <Grid item xs={2}>  
            <Button variant="contained" color="default" size="small" onClick={this.clearForm}>
              Clear Filter
            </Button>
          </Grid>  
        </Grid>   
      </MuiPickersUtilsProvider>  
    );
  }

}

DateFilter.propTypes = propTypes;
DateFilter.defaultProps = defaultProps;
