/* model teacher object: */
export const initialState = {
  id: 1,
  firstName: 'Nacy',
  lastName: 'Mathews',
  subjects: ['math', 'history'],
  students: [
    {
      id: 1,
      name: 'Sally'
    },
    {
      id: 2,
      name: 'Bob'
    }
  ]
};

export const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
