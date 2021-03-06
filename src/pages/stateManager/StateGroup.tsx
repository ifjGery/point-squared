import React, { SyntheticEvent } from 'react';
import { Dropdown, DropdownItemProps } from 'semantic-ui-react';
import styled from 'styled-components';
import { StateGroup } from '../../service';
import InputButton from '../../sharedComponents/InputButton';

const Wrapper = styled.div`
  border-top: 1px solid lightgray;
  padding-top: 0.5em;
  margin-top: 0.5em;
`;

const States = styled.div`
  margin-left: 2em;
  margin-bottom: 1em;
  line-height: 3em;
`;

const SingleState = styled.span`
  margin-right: 0.5em;

  :last-of-kind {
      margin-right: 0;
  }

  background: lightgray;
  padding: 0.2em 0.5em;
  border-radius: 5px;
`;

interface StateGroupViewProps {
  group: StateGroup
  newEdgeCallback: Function
  newStateCallback: Function
}

const StateGroupView : React.FC<StateGroupViewProps> = (
  { group, newEdgeCallback, newStateCallback },
) => {
  const onNewEdgeSelected = (
    _e: SyntheticEvent<HTMLElement, MouseEvent>,
    data: DropdownItemProps,
  ) => {
    newEdgeCallback(group._id, data.parent, data.value);
  };

  const onNewState = (value: any) => newStateCallback(group._id, value);

  const options = Object.values(group.states)
    .map((state) => ({ key: state._id, text: state.name, value: state._id }));

  return (
    <Wrapper>
      <h3>{group.name}</h3>
      <States>
        {Object.values(group.states).map((one) => (
          <div>
            {one.name}
            {' '}
            {one.default ? ' (default)' : ''}
            {' '}
            -&gt;
            {Array.from(one.edges)
              .map((edge) => <SingleState>{group.states[edge].name}</SingleState>)}
            <Dropdown
              icon="add"
              compact
            >
              <Dropdown.Menu>
                {options
                  .filter((state) => state.value !== one._id)
                  .map((item) => (
                    <Dropdown.Item
                      key={item.key}
                      text={item.text}
                      value={item.value}
                      parent={one._id}
                      onClick={onNewEdgeSelected}
                    />
                  ))}
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ))}
        <InputButton buttonText="add new state" callback={onNewState} />
      </States>
    </Wrapper>
  );
};

export default StateGroupView;
