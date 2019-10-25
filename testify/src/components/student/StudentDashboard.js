import React, { useState, useEffect }from 'react'
import AccessDenied from '../AccessDenied.js';
import StudentGrades from './StudentGrades.js';
import AssignedTests from './AssignedTests.js';
import CompletedTests from './CompletedTests.js';

import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function StudentDashboard(props) {

    const [classData, setClassData] = useState();
    const [reducedStudents, setReducedStudents] = useState(); //this is to show names of students assigned to class if I write that component
    
    useEffect(() => {
        axiosWithAuth()
            .get(`/getAssignments/${props.currentUser.id}`)
            .then(res => {
            console.log('ClassData: ', res.data);
            setClassData(res.data);
            })
            .catch(err => {
            console.log('TestBank.js err', err);
            });
        }, []);

    useEffect(() => {
        //axios get reduced students array here, then search by name to add to student object
        axiosWithAuth()
            .get('/getStudents')
            .then(response => {
            console.log('Reduced Students array: ', response.data);
            setReducedStudents(response.data.slice(0));
            })
            .catch(error => {
            console.error('Server Error: ', error);
            });
        }, []);

    console.log(classData);

    let initial;

    useEffect(()=>{
        //This is to prevent studentClass useEffect from firing before classData is loaded from props...
        initial = true;
    }, [])

    useEffect(() => {
        //this takes all of the student's teacher's classes, then sets students classes to which of those the student is assigned to.
        if (!initial){
            console.log('UseEff CD: ', classData);
            let studentsClasses = classData.filter( klass =>{
                return klass.students.includes( props.currentUser.id );
            });
            console.log('stud classes: ', studentsClasses);

            //assign all tests from all of student's classes to student's assignedTests.
            //wipe current assigned tests and set here.
            props.currentUser.assignedTests = [];
            studentsClasses.forEach( klass =>{
                klass.testsAssigned.forEach(test => {
                    let abc = props.currentUser.completedTests.filter(cTest => cTest.testId == test.id);
                    if(abc.length === 0){ //check if this test has already been completed by student before adding it to assignedTests array
                        console.log('PUSHING TEST: ', test.id);
                        props.currentUser.assignedTests.push(test);
                    }
                    else{
                        console.log('successfully filtered this test out');
                    }
                });
            });
            console.log('Students assignedTests: ', props.currentUser.assignedTests);
        }
        initial = false;
    }, [classData])

    return (
        <div>
        <h2 className='initial'>Student Dashboard</h2>
        <h3 className='initial'>Make component for showing what classes the student is in and their grade for that class <br/> (average of student scores to tests assigned to class)</h3>
        {(() => {
            if(props.loggedIn){
                if (props.currentUser.isTeacher){
                    return <AccessDenied {...props}/>
                }
                else {
                    return (
                        <div>
                        <StudentGrades {...props}/>
                        <AssignedTests {...props} currentUser={props.currentUser} />
                        <CompletedTests {...props} currentUser={props.currentUser} />
                        </div>)
                }
            }
            else{
                return <AccessDenied {...props}/>
            }
        })()} 
        </div>
    )
}
