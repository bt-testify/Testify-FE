import React, { useEffect } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function TestBank(props) {
  console.log('TestBank.js props: ', props);
  return (
    <div>
      <h1 className='initial'>Test Bank Component</h1>
      <div className='teacher-classes'></div>
    </div>
  );
}
