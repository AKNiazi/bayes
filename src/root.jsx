import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { AppContainer } from './app';
import { HashRouter } from 'react-router-dom';

const propTypes = {
  store: PropTypes.object.isRequired
};

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
      <AppContainer />
    </HashRouter>
  </Provider>
)

Root.propTypes = propTypes;

export default Root