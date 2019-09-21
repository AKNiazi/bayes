import React from 'react';
import { Route, Switch } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import * as actions from './actions/actions';

import { routes } from './pages/routes';

import './app.css';

const propTypes = {
  alertType: PropTypes.string,
  showAlert: PropTypes.bool,
  actions: PropTypes.object,
}

class App extends React.PureComponent {
  
  handleAlertDismiss = () => {
    this.props.actions.hideErrorAlert();
  };
  
  showAlert() {
    let message = this.props.alertMessage;
    message = typeof(message) === 'object' && message ? JSON.stringify(message) : message;
    return (
      <Snackbar
        message={message}
        open={this.props.showAlert}
        autoHideDuration={2000}
      >
        <SnackbarContent
            aria-describedby="client-snackbar"
            message={
              <span id="client-snackbar">
                {message}
              </span>
            }
            action={[
              <IconButton key="close" aria-label="close" color="inherit" onClick={this.handleAlertDismiss}>
                <CloseIcon/>
              </IconButton>,
            ]}
        />
      </Snackbar>
    );
  }

  render() {
    return (
      <div className="container">
        {this.showAlert()}
        <Switch>
          {routes.map((route, index) => (
            <Route
              key={index}
              exact
              path={route.path}
              component={route.component}
            />
          ))}
        </Switch>
      </div>
    );
  }
}

App.propTypes = propTypes;


const mapStateToProps = state => ({
  alertType: state.alertType,
  alertMessage: state.alertMessage,
  showAlert: state.showAlert,
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

export const AppContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
