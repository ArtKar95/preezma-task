import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import clientsReducer from './clients/clientsReducer';
import providersReducer from './providers/providersReducer';

const mainReduser = combineReducers({
  clientsReducer,
  providersReducer,
});

const store = createStore(mainReduser, applyMiddleware(thunk));

export default store;
