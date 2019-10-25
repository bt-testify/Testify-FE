import {
  SET_TITLE,
  setTitle,
  save,
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
  TEST_NOT_RECEIVED,
  CLEAR_FIELDS,
  DELETEING_TEST,
  CONFIRM_DELETE_TEST
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
    case NEW_TEST_CREATED:
      return (state = action.payload);
      break;
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

    case REMOVE_QUESTION:
      return {
        ...state,
        questions: [
          ...state.questions.filter(item => item.question !== action.payload)
        ]
      };

    case SAVING:
      return {
        ...state,
        isEditing: true
      };
      break;

    case CLEAR_FIELDS:
      return (state = initialState);

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
