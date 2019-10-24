import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setType, addQuestion, save, getTest, submitTest } from '../../actions';

const initialState = {
  isEditing: false,
  id: '',
  correct: false,
  question: '',
  type: 'Choose Value',
  options: [],
  answer: ''
};
/* Creates new questions from USER input. Does not come from reducer state or the server */

function CreateQuestion(props) {
  /* console.log('CreateQuestions.js props', props); */
  const { addQuestion, save, testObj, getTest, testId } = props;
  const [firstSubmit, setFirstSubmit] = useState(true);
  const [newQuestion, setNewQuestion] = useState(initialState);
  const [choice, setChoice] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [callSave, setCallSave] = useState(false);

  useEffect(() => {
    props.save(testId, testObj);
  }, [callSave]);
  console.log('CreateQuestion.js testObj', testObj, firstSubmit);

  /* console.log('CreateQuestion.js choice:', choice);
  
 
  console.log('CreateQuestion.js addChoice options', newQuestion.options); */
  /* console.log('CreateQuestion.js newQuestion.answer ', newQuestion.options); */
  /*  */
  console.log('CreateQuestion.js testObj:', testObj);
  console.log('CreateQuestion.js newQuestion: ', newQuestion);

  /* useEffect(() => {
    if (newQuestion.type === 'true-false') {
      setNewQuestion({
        ...newQuestion,
        options: ['T', 'F']
      });
    }
  }, [newQuestion]); */

  const handleChanges = e => {
    setNewQuestion({
      ...newQuestion,
      [e.target.name]: e.target.value
    });
  };
  const handleChoice = e => {
    e.preventDefault();
    setChoice(e.target.value);
  };

  const setMCAnswer = ans => {
    setNewQuestion({
      ...newQuestion,
      answer: ans
    });
  };

  const addChoice = e => {
    e.preventDefault();
    if (choice !== '')
      setNewQuestion({
        ...newQuestion,
        options: [...newQuestion.options, choice]
      });
    setChoice('');
  };

  const setTrueFalseChoices = e => {
    e.preventDefault();
    if (newQuestion.type === 'true-false') {
      setNewQuestion({
        ...newQuestion,
        options: ['T', 'F'],
        answer: e.target.name
      });
    }
  };

  const removeChoice = op => {
    setNewQuestion({
      ...newQuestion,
      options: newQuestion.options.filter(item => item != op)
    });
  };

  const submitQuestion = e => {
    e.preventDefault();
    if (newQuestion.type === 'multiple-choice') {
      if (
        newQuestion.question !== '' &&
        newQuestion.options.length !== 0 &&
        newQuestion.answer !== ''
      ) {
        addQuestion(newQuestion);
        setCallSave(!callSave);
        setNewQuestion({
          isEditing: false,
          id: '',
          correct: false,
          question: '',
          type: '',
          options: [],
          answer: '',
          value: ''
        });
      } else
        alert(
          "Make sure all fields are filled in and you've selected the correct answer!"
        );
    } else if (newQuestion.type === 'true-false') {
      if (newQuestion.question !== '' && newQuestion.answer !== '') {
        addQuestion(newQuestion);
        setCallSave(!callSave);
        /* if (newQuestion.type === 'true-false') {
          setNewQuestion({
            ...newQuestion,
            options: ['T', 'F']
          });
        } */
        setNewQuestion(initialState);
      } else
        alert(
          "Make sure all fields are filled in and you've selected the correct answer!"
        );
    } else
      alert(
        "Make sure all fields are filled in and you've selected the correct answer!"
      );
  };

  return (
    <div className='create-question-container'>
      <h3>Create Question</h3>
      <form className='create-question-form' action=''>
        <select name='type' onChangeCapture={handleChanges} type='text'>
          <option defaultValue value='Choose type'>
            Choose a question type:
          </option>

          <option value='multiple-choice'>multiple choice</option>
          <option value='true-false'>true-false</option>
          <option value='short-answer'>short answer</option>
        </select>
        {/* ======= MULTIPLE CHOICE ============= */}
        {newQuestion.type === 'multiple-choice' && (
          <>
            <textarea
              value={newQuestion.question}
              name='question'
              onChange={handleChanges}
              type='text'
              placeholder='Write your question'
            />
            <div>
              <p>Add choices and select the correct answer</p>
              <input
                onChange={handleChoice}
                value={choice}
                name='options'
                type='text'
                placeholder='Add Choice'
              />

              <button onClick={e => addChoice(e, choice)}>Add Item</button>
              <ul className='question-multiple-choice'>
                {newQuestion.options.map(option => (
                  <li key={option} className='question-option'>
                    <input
                      onClick={() => setMCAnswer(option)}
                      name='option'
                      type='radio'
                    />
                    <label htmlFor='option'>{option}</label>
                    <span
                      onClick={() => removeChoice(option)}
                      className='remove-item'
                    >
                      {' '}
                      X
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
        {/* ===== TRUE FALSE =========  */}
        {newQuestion.type === 'true-false' && (
          <div className='true-false-question'>
            <textarea
              value={newQuestion.question}
              name='question'
              onChange={handleChanges}
              type='text'
              placeholder='Write your question'
            />
            <div>
              <p>Check the correct answer: </p>
              <label htmlFor='true'>True</label>
              <input
                onClick={setTrueFalseChoices}
                value='T'
                name='T'
                type='checkbox'
              />
              <label htmlFor='false'>False</label>
              <input
                onClick={setTrueFalseChoices}
                name='F'
                value='F'
                type='checkbox'
              />
            </div>
          </div>
        )}

        <button type='submit' onClick={submitQuestion}>
          Submit Question
        </button>
      </form>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    questions: state.testReducer.questions,
    testId: state.testReducer.id,
    testObj: state.testReducer.testObj
  };
};

export default connect(
  mapStateToProps,
  { setType, addQuestion, save, getTest }
)(CreateQuestion);
