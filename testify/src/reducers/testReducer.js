import {
  SET_TITLE,
  SET_CREATOR,
  SET_TEST_TAKER,
  ADD_QUESTION,
  REMOVE_QUESTION,
  SAVE_FAIL,
  SAVE_SUCCESS,
  SAVING,
  NEW_TEST_CREATED,
  CREATING_NEW_TEST,
  CREATE_TEST_FAILED,
  GETTING_TEST,
  TEST_RECEIVED,
  TEST_NOT_RECEIVED
} from '../actions';
/* model test obj. */
export const initialState = {
  score: 0,
  isSaving: false,
  isEditing: false,

  creator: '',
  title: '',
  testTaker: '',
  questions: []
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

    case ADD_QUESTION:
      return {
        ...state,
        questions: [...state.questions, action.payload]
      };
      break;
    case NEW_TEST_CREATED:
      return (state = action.payload);

    case SAVING:
      return {
        ...state,
        isEditing: true
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
        isEditing: false
      };
      break;

    case TEST_RECEIVED:
      return (state = action.payload);
      break;

    case SET_TEST_TAKER:
      alert('SETTING TEST TAKER');
      break;

    default:
      return state;
  }
};
