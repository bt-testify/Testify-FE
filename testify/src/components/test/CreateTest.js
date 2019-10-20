import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion
} from '../../actions';
import QuestionType from './QuesitonType';
import CreateQuestion from './CreateQuestion';

function CreateTest(props) {
  const { title, questions, setTitle, addQuestion, removeQuestion } = props;

  console.log('CreateTest.js props: ', props);
  return (
    <div>
      <div className='create-test-container'>
        <h1 className='initial'>Create Test</h1>
        <form className='title-teacher-form' action=''>
          <input type='text' placeholder='Title' />
          <input type='text' placeholder='Teacher' />
        </form>
        <CreateQuestion />
        <div className='test-preview'>
          <h1>Test Preview</h1>
          <h2>Title: {title}</h2>
          <div className='questions'>
            {questions.map((question, index) => {
              return (
                <div key={question.id} className='preview-question'>
                  <h3>Question: {index + 1}</h3>
                  <p className='question'>{question.question}</p>
                  {/* QuestionType looks at INCOMING TEST INFO builds a question  */}
                  <QuestionType question={question} />
                  <Route
                    path='/Teacher/create-test/:questionId'
                    compoent={CreateQuestion}
                  />
                  <button
                    onClick={() =>
                      props.history.push(`/Teacher/create-test/${question.id}`)
                    }
                  >
                    Edit
                  </button>
                  <button>Delete</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
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
