import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion,
  setCreator,
  save,
  getTest
} from '../../actions';
import QuestionTypeBuilder from './QuesitonTypeBuilder';
import CreateQuestion from './CreateQuestion';

function CreateTest(props) {
  console.log('CreateTest.js props:', props);
  const {
    title,
    questions,
    creator,
    setTitle,
    setCreator,
    testObj,
    save,
    getTest,
    id
  } = props;
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

  useEffect(() => {
    /* alert('GET TEST'); */
    getTest(testObj.id);
  }, []);

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
        <CreateQuestion />
      </div>

      {/* ======= PREVIEW ========= */}
      <div className='test-preview'>
        <h1>Test Preview</h1>
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
    getTest
  }
)(CreateTest);
