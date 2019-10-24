import React, { useEffect, useState } from 'react';
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import { connect } from 'react-redux';
import { assginStudentToClass } from '../../actions';

const StudentRoster = props => {
  const { teacherObj, classes } = props;
  const { studentIds, teacherId } = teacherObj;
  const [students, setStudents] = useState([]);
  const [openDropDown, setOpenDropDown] = useState(false);
  console.log('StudentRoster.js techerObj:', teacherObj);
  console.log('StudentRoster.js students', students);
  console.log('StudentIds: ', studentIds);
  console.log('StudentRoster.js classes', classes);

  /* [{id: 0, subject: "Math", students: Array(2), testsAssigned: Array(1)} ]*/

  const addStudentToClass = (id, subject) => {
    const selectedClass = classes.find(klass => klass.subject == subject);
    const inClass = selectedClass.students.find(stu => stu.id == id);
    if (!inClass) {
      selectedClass.students.push(id);
    }
  };

  const getStudents = () => {
    studentIds.map(stId => {
      axiosWithAuth()
        .get(`/userById/${stId}`)
        .then(res => {
          setStudents([...students, res.data]);
          console.log('.get res.datat', res.data);
        })
        .catch(err => console.log('error', err));
    });
  };

  for (let i = 0; i < studentIds.lenght; i++) {}

  return (
    <div>
      <div className='student-roster'>
        <button onClick={getStudents}>Load Students</button>
        <button onClick={() => setOpenDropDown(!openDropDown)}>
          Assign Students to Classes
        </button>
        {students.map(student => (
          <div className='student-roster-student'>
            <h3>Name: {student.name}</h3>
            <p>Student Id: {student.id}</p>
            <a href='#'>
              <p>Email: {student.email}</p>
            </a>
            <p>GPA: {student.gpa}</p>
            {openDropDown && (
              <div className='class-drop-down'>
                {classes.map(klass => (
                  <>
                    <label htmlFor={klass.subject}>{klass.subject}</label>
                    <input
                      onClick={() =>
                        addStudentToClass(student.id, klass.subject)
                      }
                      name={student.name}
                      value={klass.subject}
                      type='checkbox'
                    />
                  </>
                ))}
              </div>
            )}

            {/* <select name='class-select' id=''>
              <option defaultValue value='move-student'>
                Put {student.name} in a class
              </option>
              {classes.map(klass => (
                <option value={klass.subject}>{klass.subject}</option>
              ))}
            </select> */}
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateTopProps = state => {
  return {
    teacherObj: state.teacherReducer,
    classes: state.teacherReducer.classes
  };
};

export default connect(
  mapStateTopProps,
  { assginStudentToClass }
)(StudentRoster);
