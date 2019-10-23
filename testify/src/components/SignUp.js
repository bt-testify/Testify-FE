import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import '../test.css';


const SignUpForm = ({ setLoggedIn, populateUser, history, values, touched, errors, status }) => {
  const [teachers, setTeachers] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  let initial;

  useEffect(()=>{
    //This is to prevent you from being redirected as soon as you visit the page.
    initial = true;
  }, [])

  useEffect(() => {
    // redirect to teacher or student dashboard here
    if (!initial){
      console.log(status);
      if (status.newUser.isTeacher){
        populateUser(status.newUser);
        setLoggedIn(true);
        history.push('/Teacher');
      }
      else{
        populateUser(status.newUser);
        setLoggedIn(true);
        history.push('/Student');
      }
    }
    initial = false;
  }, [status]);
  useEffect(() => {
    //axios get reduced teachers array here, then search by name to add to student object
    axiosWithAuth()
      .get('/teachers')
      .then(response => {
        console.log(response);
        setTeachers(response.data.slice(0));
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

  return (
    <div>
      <h1 className='initial'>Sign Up</h1>
      <Form className='signUpForm'>
        <Field
          className='field'
          type='text'
          name='name'
          placeholder='name'
        />
        {touched.name && errors.name && (<p className='error'>{errors.name}</p>)}
        <br />
        <Field
          className='field'
          type='text'
          name='username'
          placeholder='username'
        />
        {touched.username && errors.username && (<p className='error'>{errors.username}</p>)}
        <br />

        <Field
          className='field'
          type='email'
          name='email'
          placeholder='email'
        />
        {touched.email && errors.email && (<p className='error'>{errors.email}</p>)}
        <br />

        <Field
          className='field'
          type='password'
          name='password'
          placeholder='password'
        />
        {touched.password && errors.password && (<p className='error'>{errors.password}</p>)}
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
              <label>
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
                {touched.teacherID && errors.teacherID && (<p className='error'>Please select a teacher.</p>)}
                <br /> <br />
              </label>
            );
          }
        })()}

        {(()=>{
          if (values.isTeacher){
            values.teacherID = 0
          }
        })()}

        {values.teacherID !== null &&
        teachers.forEach((teach)=>{
          if (teach.id == values.teacherID){
              values.teacherName= teach.name; //this sets the teacherName based off of the values.teacherID which is set in the dropdown.
          }; //I couldn't easily figure out how to make selecting the dropdown update two values or run an inline function, so I did it here.
        })}

        <button type='submit'>Submit!</button>
      </Form>
    </div>
  );
};

const SignUp = withFormik({
  mapPropsToValues({
    username,
    name,
    email,
    password,
    isTeacher,
    teacherID,
    teacherName,
  }) {
    return {
      username: username || '',
      name: name || '',
      email: email || '',
      password: password || '',
      isTeacher: isTeacher || false,
      teacherID: teacherID || null,
      teacherName: teacherName || 'null',
    };
  },

  validationSchema: Yup.object().shape({
    name: Yup.string().required('Please enter your name'),
    username: Yup.string().required('Please enter your username'),
    email: Yup.string().required('Please enter your email'),
    password: Yup.string().min(6, 'Password must be at least six characters long.').required('Please enter a password'),
    teacherID: Yup.number().required('Please pick an option')
  }),

  handleSubmit( values, { setStatus }) {
    //Appending vars to form object that do not come from input form here before posting to the server
    values.students = [];
    values.testBank = [];
    values.classes = [];
    values.classSubject = '';
    values.gpa = 0;
    values.assignedTests = [];
    values.completedTests = [];

    axiosWithAuth()
      // values is our object with all our data on it.
      .post('/api/signUp', values)
      .then(res => {
        setStatus(res.data);
      })
      .catch(err => {
        alert(err.response.data.error);
        console.log(err.response);
      });
  }
})(SignUpForm);

export default SignUp;

