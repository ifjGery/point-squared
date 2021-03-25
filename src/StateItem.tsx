import React, { Fragment, SyntheticEvent } from 'react';
import { Button, Dropdown, DropdownItemProps, DropdownProps, Grid, Icon, Input, InputOnChangeData, Label, LabelProps } from 'semantic-ui-react';
import { api, Item, TagCollection } from './service';
import TagDropdownMenu from './AddNewTag';

interface StateItemProps {
    item: Item,
    updateStateCallback: Function,
    tags: TagCollection,
    addItemTagCallback: Function,
    addNewTag: Function
}

const spanStyle = {
    marginRight: '0.5em'
}

const itemStyle = {
    marginTop: '0.3em',
    display: 'inline-block',
}

const StateItem : React.FC<StateItemProps> = ({item, tags, updateStateCallback, addItemTagCallback, addNewTag}) => {
    const baseState = api.getStateGroup(item.baseState);
    const validNextStates = Array.from(baseState.states[item.currentState].edges)
        .map(one => api.getStateFromGroup(baseState, one));
    const allTags = Object.values(tags).map(one => ({key: one._id, text: one.name, value: one._id}));

    const onStateChange = (e: React.MouseEvent) => {
        const id = (e.target as HTMLElement).dataset['id'];
        updateStateCallback(item, id);
    }

    return(
        <Grid verticalAlign='middle'>
            <Grid.Row>
                <Grid.Column>
                    <span style={itemStyle}>
                        <span style={spanStyle}>{item.name}</span>
                        {Array.from(item.tags).map(one => <Label horizontal>{api.getTags()[one].name}</Label>)}
                        <TagDropdownMenu item={item} tags={tags} addItemTagCallback={addItemTagCallback} addNewTag={addNewTag}/>
                    </span>
                    <Button.Group floated='right'>
                        {validNextStates.map(one => <Button data-id={one._id} onClick={onStateChange}>{one.name}</Button>)}
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default StateItem;