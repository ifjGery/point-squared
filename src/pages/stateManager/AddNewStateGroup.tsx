import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

interface AddNewStateGroupProps {
  newStateGroupCallback: Function
}

const AddNewStateGroup : React.FC<AddNewStateGroupProps> = ({ newStateGroupCallback }) => {
  const [value, setValue] = useState<string>('');

  const addStateGroup = () => {
    newStateGroupCallback(value);
    setValue('');
  };

  const onNewStateGroup = () => {
    addStateGroup();
  };

  const onKeyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addStateGroup();
    }
  };

  return (
    <Input
      value={value}
      onChange={(e, data) => setValue(data.value)}
      onKeyDown={onKeyListener}
      action={
        <Button onClick={onNewStateGroup}>add new state group</Button>
            }
    />
  );
};

export default AddNewStateGroup;
