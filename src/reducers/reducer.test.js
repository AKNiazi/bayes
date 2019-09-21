import { reducer } from '../reducers/reducer';

describe('SET_TOURNAMENTS_DATA', () => {
  it('should change tournaments', () => {
    const action = { type: 'SET_TOURNAMENTS_DATA', tournaments: ['a', 'b'] };
    const resultedState = { tournaments: ['a', 'b'] };
    expect(reducer(null, action)).toEqual(resultedState);
  });
});