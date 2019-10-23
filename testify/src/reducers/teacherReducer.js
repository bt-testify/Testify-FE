/* model teacher object: */
import { setUser, SET_USER } from '../actions';

export const initialState = {};

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.payload);

    default:
      return state;
  }
};
