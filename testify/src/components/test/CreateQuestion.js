import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setType, addQuestion, save, getTest, submitTest } from '../../actions';

const initialState = {
  isEditing: false,
  id: '',
  correct: false,
  question: '',
  type: '',
  options: [],
  answer: ''
};
/* Creates new questions from USER input. Does not come from reducer state or the server */

function CreateQuestion(props) {
  /* console.log('CreateQuestions.js props', props); */
  const { addQuestion, save, testObj, getTest } = props;
  const [firstSubmit, setFirstSubmit] = useState(true);
  const [newQuestion, setNewQuestion] = useState(initialState);
  const [choice, setChoice] = useState('');

  console.log('CreateQuestion.js testObj', testObj, firstSubmit);

  /* console.log('CreateQuestion.js choice:', choice);
  
 
  console.log('CreateQuestion.js addChoice options', newQuestion.options); */
  /* console.log('CreateQuestion.js newQuestion.answer ', newQuestion.options); */
  /* console.log('CreateQuestion.js newQuestion: ', newQuestion); */
  console.log('CreateQuestion.js testObj:', testObj);

  const handleChanges = e => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value
    });
  };
  const handleChoice = e => {
    e.preventDefault();
    setChoice(e.target.value);
  };

  const setMCAnswer = ans => {
    setNewQuestion({
      ...newQuestion,
      answer: ans
    });
  };

  const addChoice = e => {
    e.preventDefault();
    if (choice !== '')
      setNewQuestion({
        ...newQuestion,
        options: [...newQuestion.options, choice]
      });
    setChoice('');
  };

  const removeChoice = op => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter(item => item != op)
    });
  };

  const submitQuestion = e => {
    e.preventDefault();
    if (
      newQuestion.question !== '' &&
      newQuestion.options.length !== 0 &&
      newQuestion.answer !== ''
    ) {
      addQuestion(newQuestion);

      save(testObj.id, testObj);

      setNewQuestion(initialState);
    } else
      alert(
        "Make sure all fields are filled in and you've selected the correct answer!"
      );
  };

  return (
    <div className='create-question-container'>
      <h3>Create Question</h3>
      <form className='create-question-form' action=''>
        <select name='type' onChangeCapture={handleChanges} type='text'>
          <option defaultValue value='Choose a question type'>
            Choose a question type:
          </option>
          <option value='multiple-choice'>multiple choice</option>
          <option value='true-false'>true-false</option>
          <option value='short-answer'>short answer</option>
        </select>

        {newQuestion.type === 'multiple-choice' && (
          <>
            <textarea
              value={newQuestion.question}
              name='question'
              onChange={handleChanges}
              type='text'
              placeholder='Write your question'
            />
            <div>
              <p>Add choices and select the correct answer</p>
              <input
                onChange={handleChoice}
                value={choice}
                name='options'
                type='text'
                placeholder='Add Choice'
              />

              <button onClick={e => addChoice(e, choice)}>Add Item</button>
              <ul className='question-multiple-choice'>
                {newQuestion.options.map(option => (
                  <li key={option} className='question-option'>
                    <input
                      onClick={() => setMCAnswer(option)}
                      name='option'
                      type='radio'
                    />
                    <label htmlFor='option'>{option}</label>
                    <span
                      onClick={() => removeChoice(option)}
                      className='remove-item'
                    >
                      {' '}
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {/* !!! IMPORTANT we need a server to actually save the uptdated test with the new question, otherwise every time the page re-renders,
          questions that are not hard-coded will be lost !
        */}
        <button onClick={submitQuestion}>Submit Question</button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    questions: state.testReducer.questions,
    testId: state.testReducer.id
  };
};

export default connect(
  mapStateToProps,
  { setType, addQuestion, save, getTest, submitTest }
)(CreateQuestion);
