import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';


export default function Header({ currentUser, populateUser, loggedIn, setLoggedIn }) {
  const HDiv = styled.div`
    text-decoration: none;
  `;
  const StyledNavLink = styled(NavLink)`
    text-decoration: none;
    color: black;
    :visited {
      color: black;
    }
    :hover {
      background-color: grey;
    }
  `;
  const StyledLink = styled(Link)`
    text-decoration: none;
    color: black;
    :visited {
      color: black;
    }
  `;


  let steve = {
    id: 0,
    username: 'steve123',
    name: 'steve',
    email: 'steve@gmail.com ',
    password: '123',
    isTeacher: true,
    classes: [
      [{ name: 'sally' }, { name: 'sally' }, { name: 'sally' }],
      [{ name: 'sally' }, { name: 'sally' }, { name: 'sally' }],
      [{ name: 'sally' }, { name: 'sally' }, { name: 'sally' }]
    ],
    students: [
      {
        id: 2,
        name: 'Sally',
        email: 'sally@school.com',
        password: '678',
        isTeacher: false,
        teacherName: 'Mrs. Mathews',
        class: 'Math',
        grade: '5th'
      }
    ],
    testBank: [
      {
        score: 0,
        isEditing: false,
        id: 1,
        creator: 'Mrs. Mathews',
        title: 'Math Test',
        testTaker: 'Sally',
        questions: [
          {
            id: 1,
            correct: false,
            question: "What's 6X6 ?",
            type: 'multiple-choice',
            options: [36, 34, 26, 52],
            answer: 36
          },
          {
            id: 2,
            correct: false,
            question: 'True or False, 6X6=36?',
            type: 'true-false',
            options: ['T', 'F'],
            answer: 'T'
          },
          {
            id: 3,
            correct: false,
            question: 'What is the order of operations?',
            type: 'short-answer',
            options: 'n/a',
            answer: 'parentheses, exponents, multiply, divide, add, subtract'
          }
        ]
      }
    ]
  };
  let sally = {
    id: 2,
    username: 'sally789',
    name: 'Sally',
    email: 'sally@school.com',
    password: '789',
    isTeacher: false,
    teacherName: 'Mrs. Mathews',
    class: 'Math',
    grade: '5th',
    assignedTests: [
      {
        score: 0,
        isEditing: false,
        id: 1,
        creator: 'Mrs. Mathews',
        title: 'Math Test',
        testTaker: 'Sally',
        questions: [
          {
            id: 1,
            correct: false,
            question: "What's 6X6 ?",
            type: 'multiple-choice',
            options: [36, 34, 26, 52],
            answer: 36
          },
          {
            id: 2,
            correct: false,
            question: 'True or False, 6X6=36?',
            type: 'true-false',
            options: ['T', 'F'],
            answer: 'T'
          },
          {
            id: 3,
            correct: false,
            question: 'What is the order of operations?',
            type: 'short-answer',
            options: 'n/a',
            answer: 'parentheses, exponents, multiply, divide, add, subtract'
          }
        ]
      }
    ],
    completedTests: [
      {
        score: 0,
        isEditing: false,
        id: 1,
        creator: 'Mrs. Mathews',
        title: 'Math Test',
        testTaker: 'Sally',
        questions: [
          {
            id: 1,
            correct: false,
            question: "What's 6X6 ?",
            type: 'multiple-choice',
            options: [36, 34, 26, 52],
            answer: 36
          },
          {
            id: 2,
            correct: false,
            question: 'True or False, 6X6=36?',
            type: 'true-false',
            options: ['T', 'F'],
            answer: 'T'
          },
          {
            id: 3,
            correct: false,
            question: 'What is the order of operations?',
            type: 'short-answer',
            options: 'n/a',
            answer: 'parentheses, exponents, multiply, divide, add, subtract'
          }
        ]
      }
    ]
  }

  const logSteveIn = () => {
    populateUser(steve);
    setLoggedIn(true);
  }
  const logSallyIn = () => {
    populateUser(sally);
    setLoggedIn(true);
  }

  return (
    <>
    <HDiv className='headerDiv'>
      <div className='semicircle'>
      <StyledLink to='/'>
        <h1 className='initial'>Testify</h1>
      </StyledLink>
      </div>
      
      {(() => {
        if (loggedIn === true) {
          return (
            <nav className='loggedIn'>
              <StyledNavLink exact to='/'>
                Home{' '}
              </StyledNavLink>

              <StyledNavLink to='/Teacher'>Teacher </StyledNavLink>
              <StyledNavLink to='/Student'>Student </StyledNavLink>
            </nav>
          );
        } else if (loggedIn === false) {
          return (
            <nav className='notLoggedIn'>
              <StyledNavLink exact to='/'>
                Home{' '}
              </StyledNavLink>
              <StyledNavLink to='/Login'>Login </StyledNavLink>
            </nav>
          );
        }
      })()}

    </HDiv>
    <div>
      {/* {(() => {if (currentUser !== null){
        return <h1>{currentUser.name}</h1>
      }})()} */}
      <h1>Welcome {currentUser.name}!</h1>
      <button
        onClick={() => {
          if (loggedIn) { 
            setLoggedIn(false);
          } else {
            setLoggedIn(true);
          }
        }}>Logged In: {`${loggedIn}`}
      </button>
      <button
        onClick={logSteveIn}>Log Steve In
      </button>
      <button
        onClick={logSallyIn}>Log Sally In
      </button>
    </div>
    </>
  );
}

{
  /* {(()=>{
            if (searchTerm !== ""){
              return <li>{searchTerm}</li>
            }
            else if (searchTermStatus !== ""){
              return <li>{searchTermStatus}</li>
            }
          })()} */
}
