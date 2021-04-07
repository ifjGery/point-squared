import React from 'react';
import { Icon } from 'semantic-ui-react';
import styled from 'styled-components';
import {api, Item} from '../../service';

interface StateSelectorProps {
    item: Item
    updateStateCallback: Function,
}

const StateSelector: React.FC<StateSelectorProps> = ({item, updateStateCallback}) => {
    const Wrapper = styled.span`
        padding: 0.5em;
        padding-right: 0;
        border-radius: 0.25em;
        border: 1px solid lightgray;
        overflow: hidden;
    `;

    const ActualState = styled.span`
        padding-right: 0.25em;
        margin-right: -1.25em;
    `;

    const Arrow = styled(Icon)`
        color: white;
        position: relative;
        left: 1em;
    `;

    const PossibleStates = styled.span`
        background: rgba(0,0,0,0.1);
        border: 0;
        border-right: 1px solid lightgray;
        padding: 0.5em;

        :hover {
            background: rgba(0,0,0,0.2);
        }

        :last-of-type {
            border: 0;
        }
    `;

    const baseState = api.getStateGroup(item.baseState);
    const currentState = api.getStateFromGroup(baseState, item.currentState);
    const validNextStates = Array.from(baseState.states[item.currentState].edges)
        .map(one => api.getStateFromGroup(baseState, one));

    const onStateChange = (e: React.MouseEvent) => {
        const id = (e.target as HTMLElement).dataset['id'];
        updateStateCallback(item, id);
    }

    return (
        <Wrapper>
            <ActualState>{currentState.name}</ActualState>
            <Arrow name='caret right' />
            {validNextStates.map(one => <PossibleStates data-id={one._id} onClick={onStateChange}>{one.name}</PossibleStates>)}
        </Wrapper>
    );
}

export default StateSelector