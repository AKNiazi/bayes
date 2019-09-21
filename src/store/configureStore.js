import thunk from 'redux-thunk';
import { createStore, applyMiddleware  } from 'redux';
import { reducer } from '../reducers/reducer';


export default function configureStore() {

  return createStore(
    reducer,
    { tournaments: [], showAlert: false },
    applyMiddleware(thunk),
  );
}
