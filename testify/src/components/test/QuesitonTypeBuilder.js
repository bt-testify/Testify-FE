import React from 'react';

/* QuestionTypeBuilder  looks at INCOMING TEST INFO (eventually from server), analyzes the question data
  it will buidld the question based on the type of data. 
*/
export default function QuesitonTypeBuilder({ question }) {
  if (question.type === 'multiple-choice') {
    return (
      <ul className='question-multiple-choice'>
        {question.options.map(option => (
          <li key={option} className='question-option'>
            <input name='option' type='radio' />
            <label htmlFor='option'>{option}</label>
          </li>
        ))}
      </ul>
    );
  } else if (question.type === 'true-false') {
    return (
      <ul className='question-true-false'>
        {question.options.map(option => (
          <li key={option} className='question-option'>
            <label htmlFor='option'>{option}</label>
            <input name='option' type='radio' />
          </li>
        ))}
      </ul>
    );
  }
  return (
    <div className='question-options-container'>
      <textarea name='short-anwer' id='' cols='30' rows='10' />
    </div>
  );
}
