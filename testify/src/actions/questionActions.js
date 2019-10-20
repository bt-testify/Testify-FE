// action type:
export const SET_TYPE = 'SET_TYPE';
// action creator - you will import these actions into the component in which you wan to use AND the reducer.  action is in the return of the reducer.
export const setType = qType => {
  return { type: SET_TYPE, payload: qType };
};

export const ADD_OPTION = 'ADD_OPTION';
export const addOption = option => {
  return { type: ADD_OPTION, payload: option };
};

export const REMOVE_OPTION = 'REMOVE_OPTION';
export const removeOption = option => {
  return { type: REMOVE_OPTION, payload: option };
};

export const SET_ANSWER = 'SET_ANSWER';
export const setAnswer = answer => {
  return { type: SET_ANSWER, payload: answer };
};
