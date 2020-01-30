import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import userReducer from './reducers/user';
import schoolReducer from './reducers/school';
import createSagaMiddleware from 'redux-saga'
import mySaga from '../sagas';
import { loginRequest } from './actionCreators';
const sagaMiddleware = createSagaMiddleware()
const user = JSON.parse(localStorage.getItem('user')) || {};

const store = createStore(
  combineReducers({
    user: userReducer,
    school: schoolReducer
  }),
  applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(mySaga)
console.log('user', user);
if (user && user.isAtuhenticated) {
  // store.dispatch(loginRequest({}))
}
export default store
