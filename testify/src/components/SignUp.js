import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
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
//     name:name
//     email:email
//     password:password
//     isTeacher: true;
//     classes: [ [{student},{student},{student}], [{student},{student},{student}], [{student},{student},{student}] ]
//     students: [studentuserid, studentuserid, studentuserid]
//     testBank: [{test}, {test}, {test}]
// }
//  student{
//     id:id
//     name:name
//     email:email
//     password:password
//     isTeacher: false;
//     teacherID: teacherID;
//     class:class
//     grade:grade
//     assignedTests: [{test}, {test}, {test}]
//     completedTests: [{test}, {test}, {test}]
// }

//notes: search for teacher- maybe only display one to select if you type a name that matches a teacher? 
//that way it doesnt show you all teacher on the site



const SignUpForm = ({values, touched, errors, status}) => {
    const [user, setUser] = useState([]);
    const [serverUserList, setServerUserList] = useState([]);
    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
      status && setUser(user => [...user, status]);
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

          setTeachers(serverUserList.filter((usr)=>{
            return usr.isTeacher === true;
          }))
          

          //!!!! temporary code because rick and morty characters to not have an isTeacher bool
          setTeachers(response.data.results.slice(0));
          //!!!!


        })
        .catch(error => {
          console.error('Server Error: ', error);
        });
    }, []);
  
    return (
        <div>
            <h1 className='initial'>Sign Up</h1>
            <Form className='signUpForm'>
                <Field className="field" type="text" name="name" placeholder="name" />
                {touched.name && errors.name && ( <p className="error">{errors.name}</p>)}
                <br/>

                <Field className="field" type="email" name="email" placeholder="email" />
                {touched.email && errors.email && ( <p className="error">{errors.email}</p>)}
                <br/>

                <Field className="field" type="password" name="password" placeholder="password" />
                {touched.password && errors.password && ( <p className="error">{errors.password}</p>)}
                <br/> 
                
                <label className="field">
                <span className="checkmark" />
                Are you a teacher?
                <Field
                    type="checkbox"
                    name="isTeacher"
                    checked={values.isTeacher}
                />
                </label>
                <br/>
             
                {(() => {
                    if (!values.isTeacher){
                        return ( //<p>Teacher!!</p>
                        <label> Who is your teacher? <br/>
                            <Field component="select"  name="teacherID">
                                <option>Please Choose an Option</option>
                                {
                                    teachers.map((teach)=>{
                                    return <option value={teach.id}>{teach.name}</option>
                                })}
                            </Field><br/> <br/>
                            </label>
                            )
                    }
                })()}
                

                <button type="submit">Submit!</button>
            </Form>

            {/* temp code to display successful object creation */}
            {user.map((mem, index) => (
                <ul key={index}>
                <li>Name: {mem.name}</li>
                <li>Email: {mem.email}</li>
                <li>Password: {mem.password}</li>
                <li>isTeacher: {mem.isTeacher.toString()}</li>
                </ul>
            ))}

        </div>
    )
}

const SignUp = withFormik({
    mapPropsToValues({name, email, password, isTeacher, teacherID}) {
      return {
        name: name || '',
        email: email || '',
        password: password || '',
        isTeacher: isTeacher || false,
        teacherID: teacherID || null,
      };
    },
  
    validationSchema: Yup.object().shape({ name: Yup.string().required("Please enter your name"), 
      email: Yup.string().required('Please enter your email'), password: Yup.string().required('Please enter a password')
      }),
  
    handleSubmit(values, { setStatus }) {
    //Appending teacher and student specific vars to form object here before posting to the server
        if (SignUpForm.serverUserList){
            values.id = SignUpForm.serverUserList.length; 
        }
      if (values.isTeacher)
      {
          console.log(values);
          values.students = [];
          values.testBank = [];
      }
      else {
          values.class = 0;
          values.grade = 0;
          values.assignedTests = [];
          values.completedTests = [];
      }
      axios
        // values is our object with all our data on it.
        .post("https://reqres.in/api/users/", values)
        .then(res => {
          setStatus(res.data);
          console.log(res);
        })
        .catch(err => console.log(err.response));
    }
//!!!!
    //set logged in and redirect to teacher or student dashboard here
//!!!!
  })(SignUpForm);

  export default SignUp;
