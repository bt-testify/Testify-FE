import React from 'react'

export default function StudentGrades() {

    let dummyTests = [{id: 0, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 1, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 2, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 3, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 4, score: 20, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 5, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 6, score: 0, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 7, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 8, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 9, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },
    {id: 10, score: 100, assigned: '10/22/2019', completed: '10/25/2019' },];

    let totalScore = dummyTests.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue.score;
    }, 0);
    
    let gpa = totalScore/dummyTests.length;


    return (
        <div>
            <h1 className='initial'>Student Grades</h1>
            <p>You have an average score of {gpa.toFixed()}% on the {dummyTests.length} tests you have taken. Nice!</p>
        </div>
    )
}
