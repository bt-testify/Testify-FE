import { axiosWithAuth } from '../utils/axiosWithAuth';

/* 3 things of an action suite:
1. action creators: a function that creates actions (returns action OBJECTS out of it)
2. action types: variables that contain the type strings to save us from spelling erros
3. actions: objects that describe to the reducer what event has occured and how it should update the state. (action is in the reducer switch satement)

export const someFunc = () => {
  return {type: 'SOME_ACTION', payload: }
}

*/
// action type:
export const SET_TITLE = 'SET_TITLE';
// action creator - you will import this action into the component in which you wan to use AND the reducer it's action is in the return
export const setTitle = title => {
  return { type: SET_TITLE, payload: title };
};

export const SET_CREATOR = 'SET_CREATOR';
export const setCreator = creator => {
  return { type: SET_CREATOR, payload: creator };
};

export const ADD_QUESTION = 'ADD_QUESTION';
export const addQuestion = question => {
  return { type: ADD_QUESTION, payload: question };
};

export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const removeQuestion = question => {
  console.log('testActions removeQuestoin id', question);
  return { type: REMOVE_QUESTION, payload: question };
};

export const SET_TEST_TAKER = 'SET_TEST_TAKER';
export const setTestTaker = testTaker => {
  return { type: SET_TEST_TAKER, payload: testTaker };
};
/* ===== CREATE NEW TEST ========== */
export const CREATE_TEST_FAILED = 'CREATE_TEST_FAILED';
export const CREATING_NEW_TEST = 'CREATING_NEW_TEST';
export const NEW_TEST_CREATED = 'NEW_TEST_CREATED';
/* action creator */
export const createNewTest = testObj => dispatch => {
  dispatch({ type: CREATING_NEW_TEST });
  axiosWithAuth()
    .post('/tests', testObj)
    .then(res => {
      dispatch({ type: NEW_TEST_CREATED, payload: res.data });
    })
    .catch(err => dispatch({ type: CREATE_TEST_FAILED, payload: err }));
};

/* ======= SAVING TEST ========   */
export const SAVING = 'SAVING';
export const SAVE_SUCCESS = 'SAVE_SUCCESS';
export const SAVE_FAIL = 'SAVE_FAIL';
export const save = (testId, testObj) => dispatch => {
  dispatch({ type: SAVING });
  axiosWithAuth()
    .put(`/tests/${testId}`, testObj)
    .then(res => {
      dispatch({ type: SAVE_SUCCESS, payload: res.data });
      console.log('testActions.js save res:', res);
    })
    .catch(err => dispatch({ type: SAVE_FAIL, payload: err }));
};
/* ====== GET TEST ===========  */
export const GETTING_TEST = 'GETTING_TEST';
export const TEST_RECEIVED = 'TEST_RECEIVED';
export const TEST_NOT_RECEIVED = 'TEST_NOT_RECEIVED';
export const getTest = id => dispatch => {
  console.log('testActions.js getTest called');
  dispatch({ type: GETTING_TEST });
  axiosWithAuth()
    .get(`/testById/${id}`)
    .then(res => {
      dispatch({ type: TEST_RECEIVED, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: TEST_NOT_RECEIVED, payload: err });
    });
};

/* ==== CLEAR FIELDS ======== */

export const CLEAR_FIELDS = 'CLEAR_FIELDS';

export const clearFields = () => dispatch => {
  dispatch({ type: CLEAR_FIELDS });
};

/* ======== DELETE TEST ================ */
export const DELETEING_TEST = 'DELETEING_TEST';
export const TEST_DELETED = 'TEST_DELETED';
export const CONFIRM_DELETE_TEST = 'CONFIRM_DELETE_TEST';
export const deleteTest = id => dispatch => {
  dispatch({ type: CONFIRM_DELETE_TEST });
  dispatch({ type: DELETEING_TEST, payload: id });
  axiosWithAuth()
    .delete(`/tests/${id}`)
    .then(res => {
      alert('Your Test Has Been Deleted!');
      console.log(res.data);
      dispatch({ type: CLEAR_FIELDS });
    })
    .catch(err => {
      console.log(err);
    });
};
