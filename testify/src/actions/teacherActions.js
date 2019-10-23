import { axiosWithAuth } from '../utils/axiosWithAuth';

export const SET_USER = 'SET_USER';

export const setUser = userObj => dispatch => {
  console.log('teacherActions.js setUser called: ');
  dispatch({ type: SET_USER, payload: userObj });
};
