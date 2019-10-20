/* model test obj. */
export const initialState = {
  testId: 1,
  creator: 'Mrs. Mathews',
  title: 'Math Test',
  testTaker: 'Sally',
  questions: [
    {
      questionId: 1,
      question: "What's 6X6 ?",
      type: 'multiple-choice',
      options: [36, 34, 26, 52],
      answer: 36
    },
    {
      questionId: 2,
      question: 'True or False, 6X6=36?',
      type: 'true-false',
      options: ['T', 'F'],
      answer: 'T'
    },
    {
      questionId: 3,
      question: 'What is the order of operations?',
      type: 'short-answer',
      options: 'n/a',
      answer: 'parentheses, exponents, multiply, divide, add, subtract'
    }
  ]
};

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
