import React, {useEffect, useState} from 'react';
// import ReactDOM from "react-dom";
import { Route } from 'react-router-dom';
import Header from './components/Header.js';
import './App.css';
import Landing from './components/landing/Landing.js';
import SignUp from './components/SignUp.js';
import TeacherLanding from './components/teacher/TeacherLanding.js';
import StudentLanding from './components/student/StudentLanding.js';

function App() {
  return (
    <div className="App">
      <Header  />
      <Route exact path="/" render={props => <Landing {...props} /> } />
      <Route path="/login" render={props => <SignUp {...props} /> } />
      <Route path="/Teacher" render={props => <TeacherLanding {...props} /> } />
      <Route path="/Student" render={props => <StudentLanding {...props} /> } />
    </div>
  );
}

export default App;
