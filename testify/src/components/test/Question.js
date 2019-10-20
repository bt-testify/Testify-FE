import React from 'react';
import { connect } from 'react-redux';
import { addOption, removeOption, setAnswer, setType } from '../../actions';

function Question(props) {
  console.log('Questions.js props', props);
  return (
    <div>
      <h1>Quesiton.js</h1>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isEditing: state.questionReducer.isEditing,
    questionId: state.questionReducer.questionId,
    question: state.questionReducer.question,
    type: state.questionReducer.type,
    options: state.questionReducer.options,
    answer: state.questionReducer.answer
  };
};

export default connect(
  mapStateToProps,
  { addOption, removeOption, setAnswer, setType }
)(Question);
