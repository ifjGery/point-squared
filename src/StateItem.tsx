import React, { Fragment } from 'react';
import { Button, Grid, Icon, Label } from 'semantic-ui-react';
import { api, Item } from './service';

interface StateItemProps {
    item: Item
}

const spanStyle = {
    marginRight: '0.5em'
}

const StateItem = ({item}: StateItemProps) => {
    const baseState = api.getStateGroup(item.baseState);
    const validNextStates = Array.from(baseState.states[item.currentState].edges)
        .map(one => api.getStateFromGroup(baseState, one));

    return(
        <Grid verticalAlign='middle'>
            <Grid.Row>
                <Grid.Column>
                    <span style={spanStyle}>{item.name}</span>
                    {Array.from(item.tags).map(one => <Label horizontal>{api.getTags()[one].name}</Label>)}
                    <Button icon size='mini' compact circular><Icon name='add' /></Button>
                    <Button.Group floated='right'>
                        {validNextStates.map(one => <Button>{one.name}</Button>)}
                    </Button.Group>
                </Grid.Column>
            </Grid.Row>
        </Grid>
    );
}

export default StateItem;