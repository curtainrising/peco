import { USER_ACTIONS as actions } from '../../common/constants';

const user = JSON.parse(localStorage.getItem('user')) || {};
const profileReducerDefaultState = user;

export default (state = profileReducerDefaultState, action) => {
  switch (action.type) {
    case actions.LOGIN:
      console.log('authenticated');
      return {isAtuhenticated: true};
    case actions.LOGIN_ERROR:
      return {error: 'there was an error'};
    case actions.LOG_OUT:
      localStorage.removeItem('user');
      return {};
    case actions.SIGN_UP:
      return {isAtuhenticated: true}
    default:
      return state;
  }
};
