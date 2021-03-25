import React, { Fragment, useState } from 'react';
import { Button, Dropdown, Input } from 'semantic-ui-react';
import { api,  } from './service';

interface ItemCreatorProps {
    addItem: Function
    stateGroups: Object
}

const ItemCreator: React.FC<ItemCreatorProps> = ({addItem, stateGroups}) => {
    const stateGroupOptions = Object.entries(stateGroups).map(([key,one]) => ({key, text: one.name, value: key}));

    const [name, setName] = useState<string>('');
    const [baseGroup, setBaseGroup] = useState<string>(stateGroupOptions[0].key);

    const onAddItem = () => {
        const base = api.getStateGroup(baseGroup);
        addItem(api.createItem(name, base));
    }

    return (
        <Fragment>
            <Input label='name' value={name} onChange={e => setName(e.target.value)}/>
            <Dropdown 
                defaultValue={stateGroupOptions[0].key} 
                options={stateGroupOptions} 
                value={baseGroup} 
                onChange={(event, data) => setBaseGroup((data.value as string))}
            />
            <Button onClick={onAddItem}>Add Item</Button>
        </Fragment>
    );
}

export default ItemCreator;