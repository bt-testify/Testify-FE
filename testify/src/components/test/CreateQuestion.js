import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addOption, removeOption, setType, addQuestion } from '../../actions';

const initialState = {
  isEditing: false,
  id: '',
  correct: false,
  question: '',
  type: '',
  options: [],
  answer: ''
};

function CreateQuestion(props) {
  /* console.log('Questions.js props', props); */
  const { addQuestion } = props;
  const [newQuestion, setNewQuestion] = useState(initialState);
  const [choice, setChoice] = useState('');
  /* console.log('CreateQuestion.js choice:', choice);
 
  console.log('CreateQuestion.js addChoice options', newQuestion.options); */
  /* console.log('CreateQuestion.js newQuestion.answer ', newQuestion.options); */
  console.log('CreateQuestion.js newQuestion: ', newQuestion);
  useEffect(() => {
    /*  alert('YOU CHOSE AN ANSWER'); */
  }, [newQuestion.answer]);

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
          <option value='Choose a question type'>
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
    isEditing: state.questionReducer.isEditing,
    id: state.questionReducer.questionId,
    question: state.questionReducer.question,
    type: state.questionReducer.type,
    options: state.questionReducer.options,
    answer: state.questionReducer.answer,
    questions: state.testReducer.questions
  };
};

export default connect(
  mapStateToProps,
  { addOption, removeOption, setType, addQuestion }
)(CreateQuestion);
