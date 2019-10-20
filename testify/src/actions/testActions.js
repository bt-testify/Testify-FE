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
export const ADD_QUESTION = 'ADD_QUESTION';

export const addQuestion = question => {
  return { type: ADD_QUESTION, payload: question };
};

export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const removeQuestion = question => {
  return { type: REMOVE_QUESTION, payload: question };
};

export const SET_TEST_TAKER = 'SET_TEST_TAKER';
export const setTestTaker = testTaker => {
  return { type: SET_TEST_TAKER, payload: testTaker };
};

export const SUBMIT_TEST = 'SUBMIT_TEST';
export const submitTest = test => {
  return { type: SUBMIT_TEST, payload: test };
};
