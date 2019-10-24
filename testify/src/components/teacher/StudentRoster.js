import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { connect } from 'react-redux';

const StudentRoster = props => {
  const { teacherObj } = props;
  const { classes, studentIds, teacherId } = teacherObj;
  const [students, setStudents] = useState([]);
  console.log('StudentRoster.js techerObj:', teacherObj);
  console.log('StudentRoster.js students', students);
  useEffect(() => {
    studentIds.forEach(stId => {
      axiosWithAuth()
        .get(`/userById/${stId}`)
        .then(res => {
          setStudents([...students, res.data]);
          console.log(res.data);
        })
        .catch(err => console.log('error', err));
    });
  }, []);

  return (
    <div>
      <div className='student-roster'>
        {students.map(student => (
          <div className='student-roster-student'>
            <button>Add Student To a Class</button>
            {student.name}
            <select name='class-select' id=''>
              <option defaultValue value='move-student'>
                Put {student.name} in a class
              </option>
              {classes.map(klass => (
                <option value={klass.subject}>{klass.subject}</option>
              ))}
            </select>
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

export default connect(
  mapStateTopProps,
  {}
)(StudentRoster);
