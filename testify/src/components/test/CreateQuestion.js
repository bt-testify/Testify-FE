import React, { useState } from 'react';
import { connect } from 'react-redux';
import { addOption, removeOption, setAnswer, setType } from '../../actions';

const initialState = {
  isEditing: false,
  id: '',
  question: '',
  type: '',
  options: [],
  answer: ''
};

function CreateQuestion(props) {
  console.log('Questions.js props', props);

  const [newQuestion, setNewQuestion] = useState(initialState);

  console.log(newQuestion);
  const handleChanges = e => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value
    });
  };

  const addChoice = e => {
    e.preventDefault();
    setNewQuestion({
      ...newQuestion,
      options: [...e.target.value]
    });
  };

  return (
    <div className='create-question-container'>
      <h3>Create Questoin</h3>
      <form className='create-question-form' action=''>
        <textarea
          name='question'
          onChange={handleChanges}
          type='text'
          placeholder='Write your question'
        />
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
            <div>
              <input name='options' type='text' placeholder='Add Choice' />
              <button onClick={addChoice}>+</button>
            </div>
          </>
        )}

        <button>Submit Question</button>
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
  { addOption, removeOption, setAnswer, setType }
)(CreateQuestion);
