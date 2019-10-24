/* model teacher object: */
import {
  setUser,
  SET_USER,
  ASSIGN_STUDENT_TO_CLASS,
  assginStudentToClass
} from '../actions';

export const initialState = {};

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.payload);

    case ASSIGN_STUDENT_TO_CLASS:
      const id = action.payload.id;
      const subject = action.payload.subject;
      const classPath = state.classes.find(item => (item.subject = subject));
      return {
        ...state.classPath,
        students: [...state.classPath.students, id]
      };

    default:
      return state;
  }
};
