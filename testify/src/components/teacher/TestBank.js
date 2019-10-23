import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import TestViewer from './TestViewer';

export default function TestBank(props) {
  console.log('TestBank.js props: ', props);
  const { assignedTests, classes, studentIds, name } = props.currentUser;
  const [tests, setTests] = useState([]);
  const [createdTests, setCreatedTests] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/testsByCreator/${name}`)
      .then(res => {
        console.log('TestBank.js res', res);
        setTests(res.data);
      })
      .catch(err => {
        console.log('TestBank.js err', err);
      });
  }, []);

  return (
    <div>
      <h1 className='initial'>{name}'s Tests</h1>
      <div className='teacher-classes'>
        <ul>
          {tests.map((test, index) => (
            <li key={index}>
              <Link to={`/test-viewer/${test.id}`}>{test.title}</Link>{' '}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
