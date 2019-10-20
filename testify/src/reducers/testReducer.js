import {
  SET_TITLE,
  SET_TEST_TAKER,
  ADD_QUESTION,
  REMOVE_QUESTION
} from '../actions';
/* model test obj. */
export const initialState = {
  isEditing: false,
  id: 1,
  creator: 'Mrs. Mathews',
  title: 'Math Test',
  testTaker: 'Sally',
  questions: [
    {
      id: 1,
      question: "What's 6X6 ?",
      type: 'multiple-choice',
      options: [36, 34, 26, 52],
      answer: 36
    },
    {
      id: 2,
      question: 'True or False, 6X6=36?',
      type: 'true-false',
      options: ['T', 'F'],
      answer: 'T'
    },
    {
      id: 3,
      question: 'What is the order of operations?',
      type: 'short-answer',
      options: 'n/a',
      answer: 'parentheses, exponents, multiply, divide, add, subtract'
    }
  ]
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TITLE:
      return {
        ...state,
        title: state.title
      };

    case SET_TEST_TAKER:
      alert('SETTING TEST TAKER');
    case ADD_QUESTION:
      alert('ADDING QUESTION');
    case REMOVE_QUESTION:
      alert('REMOVING QUESTION');

    default:
      return state;
  }
};
