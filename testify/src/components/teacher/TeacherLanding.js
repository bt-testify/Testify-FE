import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import CreateTest from '../test/CreateTest';
import Question from '../test/Question';

export default function TeacherLanding() {
  return (
    <div>
      <div className='teacher-tabs'>
        <NavLink to='/Teacher/create-test'>Create New Test</NavLink>
        <NavLink to='/Teacher/test-bank'>Test Bank</NavLink>
        <NavLink to='/Teacher/student-reports'>Student Reports</NavLink>
      </div>
      <h1 className='initial'>Teacher Landing</h1>
      <Route
        path='/Teacher/create-test'
        render={props => <CreateTest {...props} />}
      />
      <Route
        path='/Teacher/create-test'
        render={props => <Question {...props} />}
      />
    </div>
  );
}
