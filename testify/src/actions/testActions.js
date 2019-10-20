/* 3 things of an action suite:
1. action creators: a function that creates actions (returns action OBJECTS out of it)
2. action types: variables that contain the type strings to save us from spelling erros
3. actions: objects that describe to the reducer what event has occured and how it should update the state.

export const someFunc = () => {
  return {type: 'SOME_ACTION', payload: }
}

*/
// action type:
export const ADD_QUESTION = 'ADD_QUESTION';
// action creator - you will import this action into the component in which you wan to use AND the reducer it action is in the return
export const addQUESTION = question => {
  return { type: ADD_QUESTION, payload: question };
};

export const REMOVE_QUESTION = 'REMOVE_QUESTION';
export const removeQUESTION = question => {
  return { type: REMOVE_QUESTION, payload: question };
};

export const ADD_TITLE = 'ADD_TITLE';
export const addTitle = title => {
  return { type: ADD_TITLE, payload: title };
};
