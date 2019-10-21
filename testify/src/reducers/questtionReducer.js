import { ADD_OPTION, REMOVE_OPTION, SET_TYPE, SET_ANSWER } from '../actions';

/* model question obj. */
export const initialState = {
  isEditing: false,
  id: 1,
  question: "What's 6X6 ?",
  type: 'multiple-choice',
  options: [36, 34, 26, 52],
  answer: 36
};

export const questionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE:
      alert('SETTING TYPE');
      break;
    case SET_ANSWER:
      alert('SETTING ANSWER');
      break;
    case ADD_OPTION:
      alert('ADDING OPTION');
      break;
    case REMOVE_OPTION:
      alert('REMOVING OPTION');
    default:
      return state;
  }
};
