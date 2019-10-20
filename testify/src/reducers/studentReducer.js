/* model student object */
const initialState = {
  id: 1,
  firstName: 'Sally',
  lastName: 'Smith',
  teacher: 'Mrs. Mathews',
  testsCompleted: [{ testId: 1, title: 'Math Test', score: 98 }],
  testsPending: [{ testId: 2, title: 'History' }, { testId: 3, title: 'Art' }]
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
