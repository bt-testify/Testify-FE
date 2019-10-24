import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { setTitle, setCreator, getTest, addQuestion } from '../../actions';
import CreateQuestion from '../test/CreateQuestion';
import EditTest from './EditTest';
import QuestionTypeBuilder from '../test/QuesitonTypeBuilder';

const TestViewer = props => {
  console.log('TestView.js props', props);
  const [editing, setEditing] = useState(false);
  const idToGet = props.match.params.id;
  console.log('TestView.js idToGet: ', idToGet);
  const { title, questions, creator, id } = props.testObj;
  console.log(title, questions, creator, id);

  useEffect(() => {
    props.getTest(idToGet);
  }, []);

  return (
    <div>
      <button onClick={() => setEditing(!editing)}>Edit Test</button>
      {editing && (
        <div>
          <EditTest history={props.history} />
        </div>
      )}
      {!editing && (
        <div>
          <div className='test-preview'>
            <h5>Test Preview</h5>
            <p>Test id: {id}</p>
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
                      <p>answer: {question.answer}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  console.log('TestViewr.js mStPs state', state);
  return {
    testObj: state.testReducer
  };
};

export default connect(
  mapStateToProps,
  { getTest, setTitle, setCreator, addQuestion }
)(TestViewer);
