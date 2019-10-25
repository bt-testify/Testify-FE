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

export const SAVING_TEACHER = 'SAVING_TEACHER';
export const SAVE_TEACHER_SUCCESS = 'SAVE_TEACHER_SUCCESS';
export const SAVE_TEACHER_FAIL = 'SAVE_TEACHER_FAIL';
export const saveTeacher = (teacherId, teacherObj) => dispatch => {
  dispatch({ type: SAVING_TEACHER });
  axiosWithAuth()
    .put(`/users/${teacherId}`, teacherObj)
    .then(res => {
      dispatch({ type: SAVE_TEACHER_SUCCESS, payload: res.data });
      console.log('testActions.js SAVE_TEACHER res:', res);
    })
    .catch(err => dispatch({ type: SAVE_TEACHER_FAIL, payload: err }));
};
