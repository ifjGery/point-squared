import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

interface AddNewStateProps {
  groupId: string
  newStateCallback: Function
}

const AddNewState : React.FC<AddNewStateProps> = ({ groupId, newStateCallback }) => {
  const [value, setValue] = useState<string>('');

  const addState = () => {
    newStateCallback(groupId, value);
    setValue('');
  };

  const onNewState = () => {
    addState();
  };

  const onKeyListener = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addState();
    }
  };

  return (
    <Input
      value={value}
      onChange={(e, data) => setValue(data.value)}
      onKeyDown={onKeyListener}
      action={
        <Button parent={groupId} onClick={onNewState}>add new state</Button>
      }
    />
  );
};

export default AddNewState;
