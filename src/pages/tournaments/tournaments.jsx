import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '../../components/list';
import Modal from '../../components/Modal';
import DateFilter from '../../components/dateFilter';
import * as actions from '../../actions/actions';

const propTypes = {
  tournaments: PropTypes.array,
};

const defaultProps = {
  tournaments: [],
};

class Tournaments extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      selectedTournament: null,
    };
  }

  componentDidMount() {
    this.props.actions.getTournaments();
  }
  
  dateChanged = (newDates) => {
    if (newDates.to === '' && newDates.from === '') {
      this.props.actions.getTournaments();
    } else {
      const to = new Date(newDates.to.toDateString());
      const from = new Date(newDates.from.toDateString());
      const tournaments = this.props.tournaments.filter(item => (
        new Date(item.series.date_start) >= from && new Date(item.series.date_end) <= to
      ));
      this.props.actions.setTournamentsData(tournaments);
    }
  }

  onDataSelection = (row) => {
    this.setState({
      selectedTournament: row,
    }) 
  }

  render() {
    const { tournaments } = this.props;
    return (
      <React.Fragment>
        <Grid container justify="space-around">
          <Grid item xs={10}>
            <h2>Tournaments List</h2>
          </Grid>  
          <Grid item xs={6}>
            <DateFilter
              from=''
              to=''
              dateChanged={this.dateChanged}
            />
          </Grid>
          <Grid item xs={10}>
          {
            tournaments.length ?
              <List
                header={ ["name", "country", "city", "date_start", "date_end"] }
                list={tournaments}
                onDataSelection={this.onDataSelection}
              />
            :  <div> No Data Available </div>
          }
          </Grid>
        </Grid>
        <Modal
          data={this.state.selectedTournament}
          label="Tournament"
        />
      </React.Fragment>  
    );
  }
}

Tournaments.propTypes = propTypes;
Tournaments.defaultProps = defaultProps;

const mapStateToProps = state => ({
  tournaments: state.tournaments,
});

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export const TournamentsContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Tournaments));
