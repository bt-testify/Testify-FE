import React, { useState, useEffect } from 'react';
import { NavLink, Route } from 'react-router-dom';
import AccessDenied from '../AccessDenied.js';
import CreateTest from '../test/CreateTest';
import Question from '../test/CreateQuestion';
import CreateQuestion from '../test/CreateQuestion';
import TestBank from '../teacher/TestBank';
import TestViewer from './TestViewer';

export default function TeacherLanding(props) {
  // const { teacherUser } = props;
  // const { name, username, email } = teacherUser;
  const [navigated, setNavigated] = useState(false);

  console.log('TeacherLanding.js props: ', props);
  return (
    <div>
      {(() => {
        if (props.loggedIn) {
          if (props.currentUser.isTeacher) {
            return (
              <div>
                <div className='teacher-tabs'>
                  <NavLink to='/Teacher/create-test'>Create New Test</NavLink>
                  <NavLink to='/Teacher/test-bank'>My Test Bank</NavLink>
                  <NavLink to='/Teacher/student-roster'>Student Roster</NavLink>
                  <NavLink to='/Teacher/classes-dashboard'>My Classes</NavLink>
                </div>
              </div>
            );
          } else {
            return <AccessDenied {...props} />;
          }
        } else {
          return <AccessDenied {...props} />;
        }
      })()}
    </div>
  );
}
