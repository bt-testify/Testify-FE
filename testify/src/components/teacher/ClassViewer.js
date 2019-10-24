import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const ClassViewer = props => {
  const { assignedTests, classes, studentIds } = props.teacherObj;
  const [students, setStudents] = useState([]);

  const classSubject = props.match.params.id;

  const currentClass = classes.find(klass => {
    if (klass.subject === classSubject) {
      return klass.subject;
    }
  });
  console.log(classSubject);
  console.log('ClassViewer.js props:', props);
  console.log('ClassViewer.js classes', classes);
  console.log('ClassViewer.js currentClass', currentClass);
  console.log('ClassViewer.js students', students);

  useEffect(() => {
    currentClass.students.forEach(stId => {
      axiosWithAuth()
        .get(`/userById/${stId}`)
        .then(res => {
          setStudents([...students, res.data]);
          console.log(res.data);
        })
        .catch(err => console.log('error', err));
    });
  }, []);

  /*   const results = tests.filter(test =>
    test.creator.toLowerCase().includes(creator.toLocaleLowerCase())
  ); */

  return (
    <div>
      <h2>{currentClass.subject}</h2>
      <div className='assignments'>
        <h3>Tests Assigned:</h3>
        <ul>
          {currentClass.testsAssigned.map(test => (
            <li key={test.title}>
              <h4>{test.title}</h4>
              <p>Remove student from this class</p>
              <p>Date assigned: {test.assignedDate}</p>
              <p>Due: {test.dueDate}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className='students-list'>
        {students.map(student => (
          <div key={student.id} className='class-viewer-student'>
            <h4>Name: {student.name}</h4>
            <p>GPA: {student.gpa}</p>
            <p>Email: {student.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  return {
    teacherObj: state.teacherReducer
  };
};

export default connect(mapStateTopProps)(ClassViewer);
