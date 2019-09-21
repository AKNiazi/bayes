import configureStore from 'redux-mock-store';

import * as actions from './actions';

import { data } from '../data';

const mockStore = configureStore();
const store = mockStore();


describe('actions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  describe('setTournamentsData', () => {
    it('sets the correct data', () => {
      const expectedActions = [
        {
          tournaments: data,
          type: 'SET_TOURNAMENTS_DATA',
        },
      ];
      store.dispatch(actions.setTournamentsData(data));
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});