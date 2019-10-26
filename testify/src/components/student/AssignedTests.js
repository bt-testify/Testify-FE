import React, { useState, useEffect } from 'react'
import { Link} from 'react-router-dom';

export default function AssignedTests(props) {
const [currentPage, setCurrentPage] = useState(0)
    const buttonIncFunc = () => {
        if (currentPage+1 < (props.currentUser.assignedTests.length/5)){
            setCurrentPage(currentPage+1);
        }
      };
      const buttonDecFunc = () => {
        if (currentPage > 0){
            setCurrentPage(currentPage-1);
        }
      };

    return (
        <div className='pendingTestsDiv'>
        <h1 className='initial'>Assigned Tests</h1>
       
        {/* Render pagination buttons only if student has more than 5 assigned tests */}
        {props.currentUser.assignedTests.length > 5 &&
            <><button onClick={buttonDecFunc}>Previous</button><button onClick={buttonIncFunc}>Next</button></>
        }
       
        {props.currentUser &&
        props.currentUser.assignedTests.map((test, index)=>{
            if ((index >= currentPage*5) && (index < ((currentPage+1)*5))){
                console.log('index: ', index);
                console.log('test: ', test);
                return <p>{test.title} id: {test.id}, Assigned: {test.assignedDate}, Due: {test.dueDate} {<Link to={`/Student/TakeTest/${test.id}`}>Take Test</Link>}</p>
            }
        })}
        </div>
    )
}
