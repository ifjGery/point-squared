import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { List } from 'semantic-ui-react';
import StateItem from './StateItem';
import {api, Item} from '../../service';

const Overview : React.FC = () => {
    const Wrapper = styled.div`
        margin: 1em 0;
    `;

    const [appState, setAppState] = useState({
        tags: api.getTags(),
        stateGroups: api.getStateAll(),
        items: api.getItems()
    });

    const addNewTag = (tagName: string) => {
        const newTag = api.createTag(tagName);
        setAppState({
            ...appState,
            tags: {
                ...appState.tags,
                [newTag._id]: newTag
            }
        });
        return newTag._id;
    }

    const addItemTag = (item: Item, tag: string) => {
        item.tags.add(tag);
        setAppState({
            ...appState,
            items: {
                ...appState.items,
                [item._id]: {
                    ...item,
                    tags: item.tags                    
                }
            }
        });
        api.addTagToItem(item, api.getTags()[tag]);
    }

    const setItemState = (item: Item, state: string) => {
        setAppState({
            ...appState, 
            items: {
                ...appState.items, 
                [item._id]: {
                    ...item, 
                    currentState: state
                }
            }
        });
        api.setItemState(item, api.getStateFromGroup(api.getStateGroup(item.baseState), state));
    };

    return (
        <Wrapper>
            <h2>Todo items</h2>
            <List divided relaxed>
                {Object.values(appState.items).map(one => <List.Item>
                    <List.Content verticalAlign='middle'>
                        <StateItem 
                            item={one} 
                            tags={appState.tags}
                            updateStateCallback={setItemState} 
                            addItemTagCallback={addItemTag}
                            addNewTag={addNewTag}
                        />
                    </List.Content>
                </List.Item>)}
            </List>
        </Wrapper>
    );
}

export default Overview;

