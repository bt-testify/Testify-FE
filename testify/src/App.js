import React, { useEffect, useState } from 'react';
// import ReactDOM from "react-dom";
import { Route } from 'react-router-dom';

import Header from './components/Header.js';
import './App.css';
import Landing from './components/landing/Landing.js';
import SignUp from './components/SignUp.js';
import TeacherLanding from './components/teacher/TeacherLanding.js';
import StudentLanding from './components/student/StudentLanding.js';
import Login from './components/Login';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  // const [studentUser, setStudentUser] = useState({});
  // const [teacherUser, setTeacherUser] = useState({});

  // const populateUser = obj => {
  //   if (obj.isTeacher) {
  //     setTeacherUser(obj);
  //   } else setStudentUser(obj);
  // }; 

  const populateUser = obj => {
    setCurrentUser(obj);
  };

  return (
    <div className='App'>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} currentUser={currentUser} populateUser={populateUser} />

      <Route exact path='/' render={props => <Landing {...props} />} />
      <Route path='/SignUp' render={props => <SignUp {...props} />} />
      <Route
        path='/Login'
        render={props => (
          <Login
            {...props}
            populateUser={populateUser}
            setLoggedIn={setLoggedIn}
          />
        )}
      />

      {(() => {
        if (loggedIn === true){ 
          return <Route
            path='/Teacher'
            render={props => (
              // <TeacherLanding {...props} teacherUser={teacherUser} />
              <TeacherLanding {...props} currentUser={currentUser} loggedIn={loggedIn}/>
            )}
          />
        }
      })()}
      {(() => {
        if (loggedIn === true){
          return <Route
            path='/Student'
            render={props => (
              // <StudentLanding {...props} studentUser={studentUser} />
              <StudentLanding {...props} currentUser={currentUser} loggedIn={loggedIn}/>
            )}
          />
        }
      })()}
    </div>
  );
}

export default App;
