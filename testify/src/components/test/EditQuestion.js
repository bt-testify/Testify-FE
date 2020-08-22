import React from 'react';

export default function EditQuestion() {
  return (
    <div>
      <h3>Edit Questoin</h3>
      <form className='edit-test-form' action=''>
        <textarea type='text' placeholder='Write your question' />
        <select type='text'>
          <option value='Choose a question type'>
            Choose a question type:
          </option>
          <option value='multiple-choice'>multiple choice</option>
          <option value='true-false'>true-false</option>
          <option value='short-answer'>short answer</option>
        </select>

        <input type='text' placeholder='options' />
        <button>+</button>
      </form>
    </div>
  );
}
