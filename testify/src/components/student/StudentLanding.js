import React, { useState, useEffect }from 'react'
import AccessDenied from '../AccessDenied.js';
import StudentGrades from './StudentGrades.js';
import PendingTests from './PendingTests.js';
import CompletedTests from './CompletedTests.js';

import { axiosWithAuth } from '../../utils/axiosWithAuth';

export default function StudentLanding(props) {
    const tempTestBank = [{}];
    const [classData, setClassData] = useState();
    
    useEffect(() => {
        axiosWithAuth()
            .get(`/getAssignments/${props.currentUser.id}`)
            .then(res => {
            console.log('TestBank.js res', res);
            setClassData(res.data);
            })
            .catch(err => {
            console.log('TestBank.js err', err);
            });
        }, []);

    useEffect(() => {
        axiosWithAuth()
        .get('/allusers')
        .then(response => {
          console.log(response);
        //   setTeachers(response.data.slice(0));
        })
        .catch(error => {
          console.error('Server Error: ', error);
        });
    }, [])

    return (
        <div>
        <h1 className='initial'>Student Landing</h1>
        {(() => {
            if(props.loggedIn){
                if (props.currentUser.isTeacher){
                    return <AccessDenied {...props}/>
                }
                else {
                    return (
                        <div>
                        <h2>You are authorized to be here. Render this component</h2>
                        <StudentGrades {...props}/>
                        <PendingTests {...props} classData={classData}/>
                        <CompletedTests {...props}/>
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
