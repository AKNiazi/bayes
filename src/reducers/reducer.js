import * as actions from '../actions/actions';

export const reducer = function (state, action) {
  state = Object.assign({}, state);
  const actionHandlers = {
    [actions.SET_TOURNAMENTS_DATA]() {
      return Object.assign({}, state, {
        tournaments: action.tournaments,
      });
    },
    [actions.HIDE_ERROR_ALERT]() {
      return Object.assign({}, state, {
        showAlert: false,
      });
    },
    [actions.ALERT_MESSAGE]() {
      return Object.assign({}, state, {
        alertMessage: action.message,
        alertType: action.messageType,
        showAlert: true
      });
    }
  };
  if (action.type in actionHandlers) {
    return actionHandlers[action.type]();
  }
  return state;
};
