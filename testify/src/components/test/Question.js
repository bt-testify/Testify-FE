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
    isEditing: state.isEditing,
    questionId: state.questionId,
    question: state.question,
    type: state.type,
    options: state.options,
    answer: state.answer
  };
};

export default connect(
  mapStateToProps,
  { addOption, removeOption, setAnswer, setType }
)(Question);
