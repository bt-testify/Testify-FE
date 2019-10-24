import { axiosWithAuth } from '../utils/axiosWithAuth';

export const SET_USER = 'SET_USER';

export const setUser = userObj => dispatch => {
  console.log('teacherActions.js setUser called: ');
  dispatch({ type: SET_USER, payload: userObj });
};

export const ASSIGN_STUDENT_TO_CLASS = 'ASSIGN_STUDENT_TO_CLASS';
export const assginStudentToClass = (id, subject) => dispatch => {
  console.log('ASSIGN STUDENT');
  dispatch({ type: ASSIGN_STUDENT_TO_CLASS, payload: [id, subject] });
};
