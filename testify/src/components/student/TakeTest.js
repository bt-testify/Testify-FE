import React, { useState, useEffect } from 'react';
import AccessDenied from '../AccessDenied.js';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function TakeTest(props) {
  const [loadedTest, setLoadedTest] = useState('');
  //load test here.
  useEffect(() => {
    axiosWithAuth()
        .get(`/testById/${props.match.params.testid}`)
        .then(res => {
        console.log('Loaded Test result: ', res.data);
        setLoadedTest(res.data);

        })
        .catch(err => {
        console.log('LoadedTest error: ', err);
        });
  }, []);

  let [currentQuestion, setCurrentQuestion] = useState(0);
  let [answerList, setAnswerList] = useState([]);
  let [gradedAnswers, setAnswerCorrect] = useState([]);
  let [isChecked, setIsChecked] = useState([false, false, false, false]);

  //this function makes sure that the selected radio button is the only one that is checked,
  //and that it is correct on every question. without this the check gets moved between questions even if no answer was selected.
  const checkedCheck = () => {
    setIsChecked([false, false, false, false]);
    console.log('ans', answerList);
    console.log(currentQuestion);
    if (Array.isArray(loadedTest.questions[currentQuestion].options)) {
      loadedTest.questions[currentQuestion].options.forEach((opt, index) => {
        // console.log('the thing', opt, index, answerList[currentQuestion]);
        if (
          opt == answerList[currentQuestion] ||
          opt === answerList[currentQuestion]
        ) {
          console.log(
            'the thing',
            'opt: ',
            opt,
            'ind: ',
            index,
            'ans: ',
            answerList[currentQuestion]
          );
          if (index === 0) {
            setIsChecked([true, false, false, false]);
          } else if (index === 1) {
            setIsChecked([false, true, false, false]);
          } else if (index === 2) {
            setIsChecked([false, false, true, false]);
          } else if (index === 3) {
            setIsChecked([false, false, false, true]);
          }
        }
      });
    }
  };

  useEffect(() => {
    if(loadedTest)
    {
      checkedCheck();
    }
  }, [loadedTest, currentQuestion]);

  const handleChange = e => {
    answerList[currentQuestion] = e.target.value;
    checkedCheck();
  };
  const validateFunc = () => {
    console.log(answerList);
    console.log(answerList.includes(undefined));
    if (
      answerList.length === loadedTest.questions.length &&
      answerList.includes(undefined) === false
    ) {
      console.log('all questions have been answered');
      handleSubmit();
    } else console.log('You must answer all questions.');
  };

  const handleSubmit = () => {
    loadedTest.questions.forEach((quest, index) => {
      // console.log(`Q: ${index}, Correct Answer: ${quest.answer}, Student Answer: ${answerList[index]}`);
      if (quest.answer == answerList[index]) {
        // console.log(`Question ${index} is correct`);
        gradedAnswers[index] = true;
      } else {
        // console.log(`Question ${index} is incorrect`);
        gradedAnswers[index] = false;
      }
    });
    let score = 0;
    gradedAnswers.forEach(bool => {
      if (bool) {
        score++;
      }
    });
    let scorePercentage = ((score / gradedAnswers.length)*100).toFixed();
    const today = new Date();
    
    console.log(gradedAnswers);
    console.log(`Score: ${score}/${gradedAnswers.length}`);
    console.log(`${today.getMonth() + 1}-${today.getDate()}-${today.getFullYear()}`);

    // built completed test
    let completedTest = {
      testId: loadedTest.id,
      title: loadedTest.title,
      creator: loadedTest.creator,
      answersList: answerList,
      gradedAnswers: gradedAnswers,
      scorePercentage: scorePercentage,
      assignedDate: props.currentUser.assignedTests.find(test => {return test.id == props.match.params.testid}).assignedDate,
      completedDate: `${today.getMonth() +
        1}-${today.getDate()}-${today.getFullYear()}`
    };

    //debugging logs
    // console.log('Test.js currentUser', props.currentUser);
    // console.log(completedTest);
    // console.log(
    //   'TakeTest.js props.currenUser.completedTest',
    //   props.currentUser.completedTests
    // );
    // console.log(
    //   'TakeTest.js props.currentUser.completedTests',
    //   props.currentUser.completedTests
    // );

    props.currentUser.completedTests.push(completedTest);

    //update server version of the student by sending 
    axiosWithAuth()
      .put(`/assignedCompleted/${props.currentUser.id}`, props.currentUser)
      .then(res => {
        console.log('TakeTest.js res.data', res.data);
        props.history.push('/Student');
      })
      .catch(err => {
        console.log('TestBank.js err', err);
      });
  };

  const buttonIncFunc = () => {
    console.log('Answer state check: ', answerList);
    if (currentQuestion < loadedTest.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      checkedCheck();
    }
  };
  const buttonDecFunc = () => {
    console.log('Answer state check: ', answerList);
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      checkedCheck();
    }
  };

  return (
    <div>
      <h1 className='initial'>Take Test</h1>
      {(() => {
        if (props.loggedIn) {
          if (props.isTeacher) {
            return <AccessDenied {...props} />;
          } 
          else {
            if (loadedTest){
              return (
                <div>
                  <h2>You are taking: {loadedTest.title} #{props.match.params.testid}</h2>
                  <h4>By {loadedTest.creator}</h4>
                  <h5>Question: {currentQuestion + 1}/{loadedTest.questions.length}</h5>
                  {(() => {
                    if (loadedTest.questions[currentQuestion].type ==='multiple-choice') {
                      return (
                        <div>
                          {/* <p>I'm a multiple choice!!</p> */}
                          <p>{loadedTest.questions[currentQuestion].question}</p>
                          <form name='form1'>
                            {loadedTest.questions[currentQuestion].options.map(
                              function(opt, index) {
                                // console.log('CQ: ', currentQuestion, 'Ans', answerList[currentQuestion], 'OPT: ', opt, 'INDEX: ', index);
                                return (<p><input type='radio' name='first' value={opt} onChange={handleChange} checked={isChecked[index]} /> {opt} </p>);
                              }
                            )}
                          </form>
                        </div>
                      );
                    } else if (
                      loadedTest.questions[currentQuestion].type === 'true-false'
                    ) {
                      return (
                        <div>
                          {/* <p>I'm a true-false!!</p> */}
                          <p>{loadedTest.questions[currentQuestion].question}</p>
                          <form name='form2'>
                            {loadedTest.questions[currentQuestion].options.map((opt, index) => {
                                return (
                                  <p> <input type='radio' name='second' value={opt} onChange={handleChange} checked={isChecked[index]} /> {opt}</p>);
                              }
                            )}
                          </form>
                        </div>
                      );
                    } else if (
                      loadedTest.questions[currentQuestion].type === 'short-answer'
                    ) {
                      return (
                        <div>
                          {/* <p>I'm a short-answer!!</p> */}
                          <p>{loadedTest.questions[currentQuestion].question}</p>
                          <form>
                            <input type='text' name='gender' onChange={handleChange} placeholder={answerList[currentQuestion] || 'Enter your answer here.'}/>
                          </form>
                        </div>
                      ); } })()}
  
                  <button onClick={buttonDecFunc}>Previous</button>
                  <button onClick={buttonIncFunc}>Next</button>
  
                  {(() => {
                    if (currentQuestion + 1 === loadedTest.questions.length) {
                      return <button onClick={validateFunc}>Submit</button>;
                    }
                  })()}
                </div>
              );
            }
          }
        } 
        
        else {
          return <AccessDenied {...props} />;
        }
      })()}
    </div>
  );
}

//props.match.params.dataID
