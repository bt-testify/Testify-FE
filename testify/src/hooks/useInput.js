import { useState } from 'react';
/* ==== this is a custom hook you can import to a componet with a lot of inputs === */
export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChanges = updatedValue => {
    setValue(updatedValue);
  };
  console.log(value);
  return [value, setValue, handleChanges];
};
