import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function TestBank(props) {
  console.log('TestBank.js props: ', props);
  const { assignedTests, classes, studentIds, name } = props.currentUser;
  const [tests, setTests] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get(`/testsByCreator/${name}`)
      .then(res => {
        console.log('TestBank.js res', res);
      })
      .catch(err => {
        console.log('TestBank.js err', err);
      });
  }, []);

  return (
    <div>
      <h1 className='initial'>Test Bank Component</h1>
      <div className='teacher-classes'>
        <ul>
          {classes.map((klass, index) => (
            <li key={index}>
              Tests for <a href='#'>{klass.subject} </a> class
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
