import React from 'react';
import styled from 'styled-components';
import { Grid, Label } from 'semantic-ui-react';
import { api, Item, TagCollection } from '../../service';
import TagDropdownMenu from './AddNewTag';
import StateSelector from './StateSelector';

interface StateItemProps {
    item: Item,
    updateStateCallback: Function,
    tags: TagCollection,
    addItemTagCallback: Function,
    addNewTag: Function
}

const ItemName = styled.span`
    margin-right: 0.5em;
`;

const Item = styled.span`
    margin-top: 0.3em;
    display: inline-block;
`;

const SelectorWrapper = styled.div`
    float: right;
    padding: 0.75em;
`;

const StateItem : React.FC<StateItemProps> = ({item, tags, updateStateCallback, addItemTagCallback, addNewTag}) => (
    <Grid verticalAlign='middle'>
        <Grid.Row>
            <Grid.Column>
                <Item>
                    <ItemName>{item.name}</ItemName>
                    {Array.from(item.tags).map(one => <Label horizontal>{api.getTags()[one].name}</Label>)}
                    <TagDropdownMenu item={item} tags={tags} addItemTagCallback={addItemTagCallback} addNewTag={addNewTag}/>
                </Item>
                <SelectorWrapper>
                    <StateSelector item={item} updateStateCallback={updateStateCallback} />
                </SelectorWrapper>
            </Grid.Column>
        </Grid.Row>
    </Grid>
);

export default StateItem;