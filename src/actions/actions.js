import { data } from '../data';

export const SET_TOURNAMENTS_DATA = 'SET_TOURNAMENTS_DATA';
export function setTournamentsData(data) {
  return {
    type: SET_TOURNAMENTS_DATA,
    tournaments: data,
  };
}

export const HIDE_ERROR_ALERT = 'HIDE_ERROR_ALERT';
export function hideErrorAlert() {
  return {
    type: HIDE_ERROR_ALERT
  };
}

export const ALERT_MESSAGE = 'ALERT_MESSAGE';
export function alertMessage(messageType, message = null) {
  return {
    type: ALERT_MESSAGE,
    messageType,
    message
  };
}

export function getTournaments() {
  return function (dispatch) {
    dispatch(setTournamentsData(data));
    dispatch(alertMessage('success', 'tournaments loaded'));
  };
}
