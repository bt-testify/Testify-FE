import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion,
  setCreator,
  save,
  submitTest,
  getTest
} from '../../actions';
import QuestionTypeBuilder from '../test/QuesitonTypeBuilder';
import CreateQuestion from '../test/CreateQuestion';

function EditTest(props) {
  console.log('EditTest.js props:', props);
  const {
    title,
    questions,
    creator,
    setTitle,
    setCreator,
    testObj,
    save,
    getTest,
    submitTest,
    id
  } = props;
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  /* this use effect is only for development. there will be a blank test rendered and a new id created on server */

  const saveTest = e => {
    e.preventDefault();
    save(testObj.id, testObj);
  };

  return (
    <div className='create-test-container'>
      <div className='creator-forms-container'>
        <h1 className='initial'>Create Test</h1>
        <form className='title-teacher-form' action=''>
          <input
            onChange={e => {
              setTitle(e.target.value);
            }}
            type='text'
            placeholder='Title'
          />
          <input
            onChange={e => {
              setCreator(e.target.value);
            }}
            type='text'
            placeholder='Teacher'
          />
        </form>
        {/* Creates new questions from USER input. Does not come from reducer state or the server */}

        <CreateQuestion testObj={testObj} save={saveTest} />
      </div>

      {/* ======= PREVIEW ========= */}
      <div className='test-preview'>
        <p>Test id: {id}</p>
        <div className='created-test'>
          <button onClick={saveTest}>Save Changes</button>
          <h2>Title: {title}</h2>
          <h4>Teacher: {creator}</h4>
          <div className='questions'>
            {questions.map((question, index) => {
              return (
                <div key={question.id} className='preview-question'>
                  <h3>Question: {index + 1}</h3>
                  <p className='question'>{question.question}</p>
                  {/* QuestionType looks at INCOMING TEST INFO (eventually from server), analyzes the question data  */}
                  <QuestionTypeBuilder question={question} />
                  {/* For editing */}
                  <p>answer: {question.answer}</p>
                  {editing && editingId === index && <CreateQuestion />}
                  <button
                    onClick={() => (setEditing(!editing), setEditingId(index))}
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
  return {
    isEditing: state.testReducer.isEditing,
    creator: state.testReducer.creator,
    title: state.testReducer.title,
    testTaker: state.testReducer.testTaker,
    questions: state.testReducer.questions,
    id: state.testReducer.id,
    testObj: state.testReducer
  };
};

export default connect(
  mapStateToProps,
  {
    setTitle,
    setTestTaker,
    addQuestion,
    removeQuestion,
    setCreator,
    save,
    getTest,
    submitTest
  }
)(EditTest);
