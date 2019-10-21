import React from 'react';
import { connect } from 'react-redux';
import { addOption, removeOption, setAnswer, setType } from '../../actions';

function CreateQuestion(props) {
  const { addOption, removeOption, setAnswer, setType, options } = props;
  console.log('Questions.js props', props);
  return (
    <div>
      <h3>Create Questoin</h3>
      <form className='create-test-form' action=''>
        <textarea type='text' placeholder='Write your question' />
        <select type='text'>
          <option value='Choose a question type'>
            Choose a question type:
          </option>
          <option value='multiple-choice'>multiple choice</option>
          <option value='true-false'>true-false</option>
          <option value='short-answer'>short answer</option>
        </select>

        <input type='text' placeholder='options' />
        <button>+</button>
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
