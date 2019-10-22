import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import { withRouter } from "react-router";
import '../test.css';

//need to have a checkbox for student/teacher, and if student, then have a searchform or dropdown to select your teacher
//(loaded from list of users that are teachers from server.)

//need to check if email has already been used to create a user

//need to assign ID to created user when it gets sent to the server

// Empty inline JSX function:
// {(() => {})()}

// userArray = [{teacher},{student},{teacher}];
//  teacher{
//     id:id
//     username:username
//     email:email
//     password:password
//     isTeacher: true;
//     classes: [ [{student},{student},{student}], [{student},{student},{student}], [{student},{student},{student}] ]
//     students: [studentuserid, studentuserid, studentuserid]
//     testBank: [{test}, {test}, {test}]
// }
//  student{
//     id:id
//     username:username
//     email:email
//     password:password
//     isTeacher: false;
//     teacherID: teacherID;
//     teacherName: teacherName;
//     class:class
//     grade:grade
//     assignedTests: [{test}, {test}, {test}]
//     completedTests: [{test}, {test}, {test}]
// }

//notes: search for teacher- maybe only display one to select if you type a username that matches a teacher?
//that way it doesnt show you all teacher on the site

const SignUpForm = ({ history, values, touched, errors, status }) => {
  const [user, setUser] = useState([]);
  const [serverUserList, setServerUserList] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // const redirectUser = (string) => {
  //   history.push(string);
  // };
  console.log(history);

  useEffect(() => {
    status && setUser(user => [...user, status]);
    history.push('/Student');
  }, [status]);
  useEffect(() => {
    //axios get all users here, set into local array to search from
    //use array length to set ID of new user
    //filter teachers with search to allow student to choose teacher
    axios
      .get('https://rickandmortyapi.com/api/character/')
      .then(response => {
        // console.log(response);
        //   console.log(response.data.results);
        setServerUserList(response.data.results.slice(0));

        setTeachers(
          serverUserList.filter(usr => {
            return usr.isTeacher === true;
          })
        );

        //!!!! temporary code because rick and morty characters to not have an isTeacher bool
        setTeachers(response.data.results.slice(0));
        //!!!!
      })
      .catch(error => {
        console.error('Server Error: ', error);
      });
  }, []);

  //Teacher search form code. Listens for text inputted into search box, then filters teacher array for names that match.
  //Names that match get displayed in the 'please choose one' dropdown, and the chosen one's id is added to the student object
  const handleChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      const results = teachers.filter(char =>
        char.name.toLowerCase().includes(searchTerm)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [teachers, searchTerm]);

  const dropDownFunc = teach => {};

  return (
    <div>
      <h1 className='initial'>Sign Up</h1>
      <Form className='signUpForm'>
        <Field
          className='field'
          type='text'
          name='username'
          placeholder='username'
        />
        {touched.username && errors.username && (
          <p className='error'>{errors.username}</p>
        )}
        <br />

        <Field
          className='field'
          type='email'
          name='email'
          placeholder='email'
        />
        {touched.email && errors.email && (
          <p className='error'>{errors.email}</p>
        )}
        <br />

        <Field
          className='field'
          type='password'
          name='password'
          placeholder='password'
        />
        {touched.password && errors.password && (
          <p className='error'>{errors.password}</p>
        )}
        <br />

        <label className='field'>
          <span className='checkmark' />
          Are you a teacher?
          <Field type='checkbox' name='isTeacher' checked={values.isTeacher} />
        </label>
        <br />

        {(() => {
          if (!values.isTeacher) {
            return (
              //<p>Teacher!!</p>
              <label>
                {' '}
                Who is your teacher? <br />
                <Field
                  className='field'
                  type='text'
                  value={searchTerm}
                  placeholder='Teacher Name'
                  onChange={handleChange}
                />
                <br />
                <Field component='select' name='teacherID'>
                  <option>Please Choose an Option</option>
                  {searchResults.map(teach => {
                    return (
                      <option
                        value={teach.id}
                        onChange={() => {
                          console.log(values);
                          values.teacherName = teach.name;
                        }}
                      >
                        {teach.name}
                      </option>
                    );
                  })}
                </Field>
                <br /> <br />
              </label>
            );
          }
        })()}

        {(() => {
          /*  values.id = serverUserList.length; //this is setting the new user's ID based off the length of the server user list.
                    if (values.teacherID !== null){
                        teachers.forEach((teach)=>{
                            if (teach.id === values.id){
                                values.teacherName= teach.name; //this sets the teacherName based off of the values.teacherID which is set in the dropdown.
                            }; //I couldn't easily figure out how to make selecting the dropdown update two values or run an inline function, so I did it here.
                        })
                    } */
        })()}
        {(() => {
          values.stupidprops = history;
          // console.log('stupidprops: ', stupidprops);
        })()}

        <button type='submit'>Submit!</button>
      </Form>

      {/* temp code to display successful object creation */}
      {user.map((mem, index) => (
        <ul key={index}>
          <li>id: {mem.id}</li>
          <li>Name: {mem.username}</li>
          <li>Email: {mem.email}</li>
          <li>Password: {mem.password}</li>

          {(() => {
            if (!mem.isTeacher) {
              return <li>Teacher Name: {mem.teacherName}</li>;
            }
          })()}
          {(() => {
            if (!mem.isTeacher) {
              return <li>Teacher ID: {mem.teacherID}</li>;
            }
          })()}
        </ul>
      ))}
    </div>
  );
};

const SignUp = withFormik({
  mapPropsToValues({
    username,
    email,
    password,
    isTeacher,
    teacherID,
    teacherName,
    stupidprops,
  }) {
    return {
      username: username || '',
      email: email || '',
      password: password || '',
      isTeacher: isTeacher || false,
      teacherID: teacherID || 0,
      teacherName: teacherName || 'null',
      stupidprops: stupidprops || 'null',
    };
  },

  validationSchema: Yup.object().shape({
    username: Yup.string().required('Please enter your username'),
    email: Yup.string().required('Please enter your email'),
    password: Yup.string().required('Please enter a password')
  }),

  handleSubmit( values, { setStatus }) {
    //Appending teacher and student specific vars to form object here before posting to the server
    // history.push('/Student');
    // console.log(props);
    values.students = [];
    values.testBank = [];

    values.classSubject = 0;
    values.grade = 0;
    values.assignedTests = [];
    values.completedTests = [];

    let formikProps = values.stupidprops;
    // console.log(stupidprops);
    console.log('formikProps:', formikProps);
    values.stupidprops = null;

    axiosWithAuth()
      // values is our object with all our data on it.
      .post('/api/signUp', values)
      .then(res => {
        setStatus(res.data);
        console.log(res.data);
        formikProps.history.push('/Student');
        if (res.data.isTeacher){
          // redirectUser('/Teacher');
        }
        else{
          // redirectUser('/Student');
        }
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log(err.response);
      });
  }
  //!!!!
  //set logged in and redirect to teacher or student dashboard here
  //!!!!
})(SignUpForm); //, props

export default SignUp;

