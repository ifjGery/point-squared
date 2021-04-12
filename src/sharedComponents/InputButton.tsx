import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

interface InputButtonProps {
  callback: Function
  buttonText: string
}

const InputButton : React.FC<InputButtonProps> = ({ callback, buttonText }) => {
  const [value, setValue] = useState<string>('');

  const addState = () => {
    callback(value);
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
        <Button onClick={onNewState}>{buttonText}</Button>
      }
    />
  );
};

export default InputButton;
