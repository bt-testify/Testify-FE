import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import {
  setTitle,
  setCreator,
  getTest,
  addQuestion,
  deleteTest,
  saveTeacher
} from '../../actions';
import CreateQuestion from '../test/CreateQuestion';
import EditTest from './EditTest';
import QuestionTypeBuilder from '../test/QuesitonTypeBuilder';
import styled from 'styled-components';

const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

const EditButton = styled(Button)`
  color: orange;
  border-color: orange;
`;

/* ====== COMPONENT ============== */
/* const assignment = {
  id: id,
  title: title,
  assignedDate: dateAssigned,
  dueDate: null
}; */

const TestViewer = props => {
  /* props */
  const { testObj, classes, teacherObj, testIds } = props;
  const { title, questions, creator, id } = props.testObj;

  console.log(title, questions, creator, id);
  console.log('TestView.js props', props);

  /* local state and bools */
  const today = new Date();
  const dateAssigned = `${today.getMonth() +
    1}-${today.getDate()}-${today.getFullYear()}`;
  const [dueDate, setDueDate] = useState('');
  const [assigning, setAssigning] = useState(false);
  const [editing, setEditing] = useState(false);
  const idToGet = props.match.params.id;
  console.log('TestView.js idToGet: ', idToGet);
  console.log('TestViewer dueDate', dueDate);
  const [subj, setSubj] = useState('');
  const [submitTrue, setSubmitTrue] = useState(false);
  const [tests, setTests] = useState([]);
  const [newAssignment, setNewAssignment] = useState({
    id: id,
    title: title,
    assignedDate: dateAssigned,
    dueDate: null
  });
  useEffect(() => {
    axiosWithAuth()
      .get(`/testsByCreator/${teacherObj.name}`)
      .then(res => {
        console.log('TestBank.js res', res);
        setTests(res.data);
      })
      .catch(err => {
        console.log('TestBank.js err', err);
      });
  }, []);

  useEffect(() => {
    console.log(subj);
    console.log('isediting', editing);
  }, [subj]);

  useEffect(() => {
    props.getTest(idToGet);
  }, []);

  const addAssignmentToClass = obj => {
    const selectedClass = classes.find(klass => klass.id == subj);
    const assignTo = selectedClass.testsAssigned.find(
      test => test.id == obj.id
    );
    if (!assignTo) {
      selectedClass.testsAssigned.push(obj);
      console.log('SelectedClass, classes ', selectedClass, classes);
      setSubmitTrue(false);
      setSubj(null);
    }
  };

  /* addAssignmentToClass(assignment, klass.subject); */

  /* ======= RETURN ============= */
  return (
    <div>
      <div className='test-viewer-options-btns'>
        <div className='viewer-btn'>
          <EditButton onClick={() => setEditing(!editing)}>
            Edit Test
          </EditButton>
        </div>

        <div className='assign-container'>
          <div>
            <Button onClick={() => setAssigning(!assigning)}>
              Assign this test to a class
            </Button>
          </div>

          {assigning && (
            <div className='class-selector'>
              <form>
                <select
                  onChange={e => {
                    setSubj(e.target.value);
                    console.log(subj);
                  }}
                >
                  <option>Please Choose an Option</option>
                  {classes.map(klass => {
                    return <option value={klass.id}>{klass.subject}</option>;
                  })}
                </select>
              </form>
            </div>
          )}
          {subj && (
            <div className='date-picker'>
              <input
                onChange={e => {
                  setNewAssignment({
                    ...newAssignment,
                    dueDate: e.target.value
                  });
                  setSubmitTrue(true);
                }}
                type='date'
              />
            </div>
          )}
          {submitTrue && (
            <Button onClick={() => addAssignmentToClass(newAssignment)}>
              Assign Test
            </Button>
          )}
        </div>

        <div className='viewer-btn'>
          <TomatoButton
            id='delete-test-btn'
            onClick={() => {
              props.deleteTest(id);
              props.history.push('/Teacher/test-bank');
            }}
          >
            DELETE THIS TEST
          </TomatoButton>
        </div>
      </div>
      {editing && (
        <div>
          <EditTest history={props.history} />
        </div>
      )}
      {!editing && (
        <div>
          <div className='test-preview'>
            <h5>Test Preview</h5>
            <h3>Teacher: {creator}</h3>
            <p>Test id: {id}</p>
            <div className='created-test'>
              <h2>Title: {title}</h2>

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
    testObj: state.testReducer,
    classes: state.teacherReducer.classes,
    teacherObj: state.teacherReducer,
    testIds: state.teacherReducer.testIds
  };
};

export default connect(
  mapStateToProps,
  { getTest, setTitle, setCreator, addQuestion, deleteTest, saveTeacher }
)(TestViewer);
