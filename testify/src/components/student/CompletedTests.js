import React, { useState } from 'react'

export default function CompletedTests(props) {
    const [currentPage, setCurrentPage] = useState(0)

    console.log('COMPLETED TESTS: ', props.currentUser.completedTests);

    const buttonIncFunc = () => {
        if (currentPage+1 < (props.currentUser.completedTests.length/5)){
            setCurrentPage(currentPage+1);
        }
      };
      const buttonDecFunc = () => {
        if (currentPage > 0){
            setCurrentPage(currentPage-1);
        }
      };

    return (
        <div>
            <h1 className='initial'>Completed Tests</h1>
            
            {/* Render pagination buttons only if student has more than 5 completed tests */}
            {props.currentUser.completedTests.length > 5 &&
            <><button onClick={buttonDecFunc}>Previous</button><button onClick={buttonIncFunc}>Next</button></>
            }
            {props.currentUser.completedTests &&
            props.currentUser.completedTests.map((test, index)=>{
                if ((index >= currentPage*5) && (index < ((currentPage+1)*5))){
                    return <p>{test.title} id: {test.testId}, score: {test.scorePercentage}%, Assigned: {test.assignedDate}, Completed: {test.completedDate}</p>
                }
            })}
        </div>
    )
}
