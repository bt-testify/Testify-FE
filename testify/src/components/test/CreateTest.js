import React, { useState } from 'react';
import { useInput } from '../../hooks/useInput';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  setTitle,
  setTestTaker,
  addQuestion,
  removeQuestion,
  setCreator
} from '../../actions';
import QuestionTypeBuilder from './QuesitonTypeBuilder';
import CreateQuestion from './CreateQuestion';
import EditQuestion from './EditQuestion';

function CreateTest(props) {
  const { title, questions, creator, setTitle, setCreator } = props;
  const [editing, setEditing] = useState(false);
  const [editingId, setEditingId] = useState('');

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
        <div className='created-test'>
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
    question: state.questionReducer
  };
};

export default connect(
  mapStateToProps,
  { setTitle, setTestTaker, addQuestion, removeQuestion, setCreator }
)(CreateTest);
