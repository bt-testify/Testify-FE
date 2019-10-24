import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion,
  setCreator,
  save,
  createNewTest,
  getTest,
  clearFields
} from '../../actions';
import QuestionTypeBuilder from './QuesitonTypeBuilder';
import CreateQuestion from './CreateQuestion';
import EditQuestion from './EditQuestion';

function CreateTest(props) {
  console.log('CreateTest.js props:', props);
  const {
    title,
    teacherName,
    questions,
    creator,
    setTitle,
    setCreator,
    testObj,
    save,
    getTest,
    createNewTest,
    removeQuestion,
    id
  } = props;
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');
  const [clearingFiels, setClearingFields] = useState(false);
  console.log('teacherName:', teacherName);
  /* this use effect is only for development. there will be a blank test rendered and a new id created on server */

  useEffect(() => {
    setClearingFields(!clearFields);
  }, []);

  useEffect(() => {
    props.createNewTest(testObj);
  }, [clearFields]);

  const saveTest = e => {
    e.preventDefault();
    save(testObj.id, testObj);
    props.history.push('/Teacher/test-bank');
  };

  const persistTitle = () => {
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
              persistTitle();
            }}
            type='text'
            placeholder='Title'
          />
          <input
            onChange={e => {
              setCreator(e.target.value);
            }}
            value={creator}
            type='text'
            placeholder='Teacher'
          />
        </form>
        {/* Creates new questions from USER input. Does not come from reducer state or the server */}
        <CreateQuestion testObj={testObj} save={saveTest} />
      </div>

      {/* ======= PREVIEW ========= */}
      <div className='test-preview'>
        <h1>Test Preview</h1>
        <p>Test id: {id}</p>
        <div className='created-test'>
          <button onClick={saveTest}>Submit Test</button>
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
                  {editing && editingId === index && <EditQuestion />}
                  <button
                    onClick={() => (setEditing(!editing), setEditingId(index))}
                  >
                    Edit
                  </button>
                  <button onClick={() => removeQuestion(question.question)}>
                    Delete
                  </button>
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
    testObj: state.testReducer,
    teacherName: state.teacherReducer.name
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
    createNewTest,
    clearFields
  }
)(CreateTest);
