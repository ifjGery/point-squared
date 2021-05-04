import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { api, StateGoupCollection } from '../../service';

interface ItemCreatorProps {
  addItem: Function;
  stateGroups: StateGoupCollection;
}

const Wrapper = styled.section`
  > * {
    padding-right: 1em;
  }
`;

const ItemCreator: React.FC<ItemCreatorProps> = ({ addItem, stateGroups }) => {
  const stateGroupOptions = Object.entries(stateGroups).map(([key, one]) => ({
    key,
    text: one.name,
    value: key,
  }));

  const [name, setName] = useState<string>('');
  const [baseGroup, setBaseGroup] = useState<string>(stateGroupOptions[0].key);

  const onAddItem = () => {
    const base = api.getStateGroup(baseGroup);
    addItem(api.createItem(name, base));
  };

  return (
    <Wrapper>
      <Input
        placeholder="item name"
        label="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Dropdown
        options={stateGroupOptions}
        value={baseGroup}
        onChange={(event, data) => setBaseGroup(data.value as string)}
      />
      <Button onClick={onAddItem}>Add Item</Button>
    </Wrapper>
  );
};

export default ItemCreator;
