import { USER_ACTIONS, SCHOOL_ACTIONS } from '../../helpers/constants';
import history from '../../helpers/history';

const user = JSON.parse(localStorage.getItem('user')) || {};
console.log('user', user);
const profileReducerDefaultState = user;

export default (state = profileReducerDefaultState, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case USER_ACTIONS.REGISTER_SUCCESS:
    case USER_ACTIONS.LOGIN_SUCCESS:
    case SCHOOL_ACTIONS.JOIN_SCHOOL_SUCCESS:
    case SCHOOL_ACTIONS.AUTHENTICATE_SUCCESS:
      console.log('update-user', payload.user);
      localStorage.setItem('user', JSON.stringify(payload.user));
      return payload.user;
    case USER_ACTIONS.LOG_OUT:
    case SCHOOL_ACTIONS.AUTHENTICATE_FAILURE:
      localStorage.removeItem('user');
      history.push('/')
      return {}
    default:
      return state;
  }
};
