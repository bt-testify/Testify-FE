import React from 'react';
import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion
} from '../../actions';

function CreateTest(props) {
  console.log('CreateTest.js props: ', props);
  return (
    <div>
      <h1 className='initial'>Create Test</h1>
      <div className='test-container'></div>
    </div>
  );
}

const mapStateToProps = state => {
  console.log('CreateTest.js mSTP state', state);
  return {
    isEditing: state.testReducer.isEditing,
    creator: state.testReducer.creator,
    title: state.testReducer.title,
    testTaker: state.testReducer.testTaker,
    questions: state.testReducer.questions,
    question: state.questionReducer
  };
};

export default connect(
  mapStateToProps,
  { setTitle, setTestTaker, addQuestion, removeQuestion }
)(CreateTest);
