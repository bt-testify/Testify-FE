import React from 'react';
import { NavLink, Route } from 'react-router-dom';
import CreateTest from '../test/CreateTest';
import Question from '../test/CreateQuestion';
import CreateQuestion from '../test/CreateQuestion';

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
        exact
        path='/Teacher/create-test'
        render={props => <CreateTest {...props} />}
      />
    </div>
  );
}
