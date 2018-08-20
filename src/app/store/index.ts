import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

export function initializeStore(initialState = {}) {
  return createStore(reducers, initialState, composeWithDevTools());
}
