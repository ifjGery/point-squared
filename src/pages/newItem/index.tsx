import React, { useState } from 'react';
import styled from 'styled-components';
import ItemCreator from './ItemCreator';
import { api, Item } from '../../service';

const Wrapper = styled.div`
    margin: 1em;
    text-align: center;
`;

const NewItem : React.FC = () => {
  const [appState, setAppState] = useState({
    tags: api.getTags(),
    stateGroups: api.getStateAll(),
    items: api.getItems(),
  });

  const addItem = (item: Item) => {
    setAppState({
      ...appState,
      items: {
        ...appState.items,
        [item._id]: item,
      },
    });
  };

  return (
    <Wrapper>
      <h2>Add new Item</h2>
      <ItemCreator addItem={addItem} stateGroups={appState.stateGroups} />
    </Wrapper>
  );
};

export default NewItem;
