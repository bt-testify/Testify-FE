import {
  SET_TITLE,
  SET_CREATOR,
  SET_TEST_TAKER,
  ADD_QUESTION,
  REMOVE_QUESTION,
  SAVE_FAIL,
  SAVE_SUCCESS,
  SAVING,
  GETTING_TEST,
  TEST_RECEIVED,
  TEST_NOT_RECEIVED
} from '../actions';
/* model test obj. */
export const initialState = {
  score: 0,
  isSaving: false,
  isEditing: false,
  id: 1,
  creator: 'Mrs. Mathews',
  title: 'Math Test',
  testTaker: 'Sally',
  questions: [
    {
      id: 1,
      correct: false,
      question: "What's 6X6 ?",
      type: 'multiple-choice',
      options: [36, 34, 26, 52],
      answer: 36
    },
    {
      id: 2,
      correct: false,
      question: 'True or False, 6X6=36?',
      type: 'true-false',
      options: ['T', 'F'],
      answer: 'T'
    },
    {
      id: 3,
      correct: false,
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
        title: action.payload
      };
      break;
    case SET_CREATOR:
      return {
        ...state,
        creator: action.payload
      };
      break;
    case SET_TEST_TAKER:
      alert('SETTING TEST TAKER');
      break;
    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
      break;

    case SAVING:
      return {
        ...state,
        isSaving: true
      };
      break;

    case SAVE_SUCCESS:
      console.log(
        'testReducer.js SAVE_SUCESSS action.payload: ',
        action.payload
      );
      return {
        ...state,
        state: action.payload,
        isSaving: false
      };
      break;

    case TEST_RECEIVED:
      return (state = action.payload);
      break;

    default:
      return state;
  }
};
