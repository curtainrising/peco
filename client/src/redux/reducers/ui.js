import { USER_ACTIONS, SCHOOL_ACTIONS, UI_ACTIONS } from '../../helpers/constants';

const uiDefaultState = {
  code: ''
}

export default (state = uiDefaultState, action) => {
  const { type, payload } = action;
  switch (action.type) {
    case USER_ACTIONS.LOGIN_FAILURE:
    case USER_ACTIONS.REGISTER_FAILURE:
    case UI_ACTIONS.UPDATE_ERROR:
    case SCHOOL_ACTIONS.JOIN_SCHOOL_FAILURE:
    case SCHOOL_ACTIONS.ADD_STUDENT_FAILURE:
    case SCHOOL_ACTIONS.DELETE_STUDENT_FAILURE:
    case SCHOOL_ACTIONS.UPDATE_SUDENT_FAILURE:
    case SCHOOL_ACTIONS.ADD_TEACHER_FAILURE:
    case SCHOOL_ACTIONS.UPDATE_TEACHER_FAILURE:
    case SCHOOL_ACTIONS.DELETE_TEACHER_FAILURE:
    case SCHOOL_ACTIONS.ADD_CLASS_FAILURE:
    case SCHOOL_ACTIONS.UPDATE_CLASS_FAILURE:
    case SCHOOL_ACTIONS.DELETE_CLASS_FAILURE:
    case SCHOOL_ACTIONS.UPLOAD_CLASS_FAILURE:
      return {
        code: payload
      };
    case UI_ACTIONS.REMOVE_ERROR:
      return {};
    default:
      return state;
  }
};
