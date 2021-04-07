import React, {useState} from 'react';
import ItemCreator from './ItemCreator';
import {api, Item} from '../../service';

const NewItem : React.FC = () => {
    const [appState, setAppState] = useState({
        tags: api.getTags(),
        stateGroups: api.getStateAll(),
        items: api.getItems()
    });

    const addItem = (item: Item) => {
        setAppState({
            ...appState, 
            items: {
                ...appState.items, 
                [item._id]: item
            }
        });
    };

    return (
        <ItemCreator addItem={addItem} stateGroups={appState.stateGroups} />
    );
}

export default NewItem;