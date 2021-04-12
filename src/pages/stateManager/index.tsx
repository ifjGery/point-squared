import React, { useState } from 'react';
import styled from 'styled-components';
import { api, StateGoupCollection } from '../../service';
import AddNewStateGroup from './AddNewStateGroup';
import StateGroupView from './StateGroup';

const Wrapper = styled.div`
  margin: 1em 0;
`;

const StateManagerPage: React.FC = () => {
  const [stateGroups, setStateGroups] = useState<StateGoupCollection>(api.getStateAll());

  const addEdge = (groupId: string, stateId: string, edgeId: string) => {
    stateGroups[groupId].states[stateId].edges.add(edgeId);
    setStateGroups({
      ...stateGroups,
      [groupId]: {
        ...stateGroups[groupId],
        states: {
          ...stateGroups[groupId].states,
          [stateId]: {
            ...stateGroups[groupId].states[stateId],
            edges: stateGroups[groupId].states[stateId].edges,
          },
        },
      },
    });
    const stateGroup = api.getStateGroup(groupId);
    api.createStateEdge(
      api.getStateFromGroup(stateGroup, stateId),
      api.getStateFromGroup(stateGroup, edgeId),
    );
  };

  const addState = (groupId: string, name: string) => {
    const newState = api.createState(api.getStateGroup(groupId), name);
    setStateGroups({
      ...stateGroups,
      [groupId]: {
        ...stateGroups[groupId],
        [newState._id]: newState,
      },
    });
  };

  const addStateGroup = (name: string) => {
    const newStateGroup = api.createStateGroup(name);
    setStateGroups({
      ...stateGroups,
      [newStateGroup._id]: newStateGroup,
    });
  };

  return (
    <Wrapper>
      <h2>State Manager</h2>
      <section>
        <AddNewStateGroup newStateGroupCallback={addStateGroup} />
        {Object.values(stateGroups).map((one) => (
          <StateGroupView
            group={one}
            newEdgeCallback={addEdge}
            newStateCallback={addState}
          />
        ))}
      </section>
    </Wrapper>
  );
};

export default StateManagerPage;
