import React from 'react'
import AccessDenied from '../AccessDenied.js';
import StudentGrades from './StudentGrades.js';
import PendingTests from './PendingTests.js';
import CompletedTests from './CompletedTests.js';

export default function StudentLanding(props) {
    const tempTestBank = [{}];
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
                        <PendingTests {...props}/>
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
