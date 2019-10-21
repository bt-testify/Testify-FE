/* model student object */
const initialState = {
  id: 1,
  firstName: 'Sally',
  lastName: 'Smith',
  teacher: 'Mrs. Mathews',
  testsCompleted: [{ id: 1, title: 'Math Test', score: 98 }],
  testsPending: [{ id: 2, title: 'History' }, { id: 3, title: 'Art' }]
};

export const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
