import React, { useState } from 'react'

export default function CompletedTests() {
    let dummyTests = [{id: 0, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 1, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 2, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 3, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 4, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 5, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 6, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 7, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 8, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 9, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 10, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },];

    const [currentPage, setCurrentPage] = useState(0)
    const buttonIncFunc = () => {
        if (currentPage+1 < (dummyTests.length/5)){
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
            <button onClick={buttonDecFunc}>Previous</button><button onClick={buttonIncFunc}>Next</button>
            {dummyTests &&
            dummyTests.map((test, index)=>{
                if ((index >= currentPage*5) && (index < ((currentPage+1)*5))){
                    return <p>id: {test.id}, score: {test.score}%, Assigned: {test.assigned}, Completed: {test.completed}</p>
                }
            })}
        </div>
    )
}
